import os
from random import shuffle
from colorthief import ColorThief


BUTTON_DIR = "src/buttons"
TOOL_DIR = "tools"
WORKING_DIR = os.getcwd()
OUTPUT = "output.txt"
BLACKLIST = "button-blacklist.txt"
SLASH = "/" # in case this matters on windows
BREAK = "\n"
HTML_A = "<img src=\"" + BUTTON_DIR + SLASH
HTML_B = "\" alt=\""
HTML_C = "\">"
IS_DEBUG = False

def main():
  button_list = os.listdir(WORKING_DIR + SLASH + BUTTON_DIR)
  with open(WORKING_DIR + SLASH + TOOL_DIR + SLASH + OUTPUT, "w") as f:
    blacklist = get_blacklist()
    button_list = sort_buttons(button_list, 2)
    for button in button_list:
      if button not in blacklist:
        f.write(format_html(button) + BREAK)

def format_html(file_string):
  return HTML_A + file_string + HTML_B + os.path.splitext(file_string)[0] + HTML_C

def get_blacklist():
  with open(WORKING_DIR + SLASH + TOOL_DIR + SLASH + BLACKLIST, "r") as f:
    raw = f.readlines()
    blacklist = [""] * len(raw)
    for index in range(len(raw)):
      blacklist[index] = (raw[index]).rstrip()
    return blacklist
  
def get_dominant_rgb(image):
  color_thief = ColorThief(image)
  return color_thief.get_color(quality=1)

def rgb_to_hsv(rgb):
  # stolen from web.archive.org/web/2/https://math.stackexchange.com/questions/556341/rgb-to-hsv-color-conversion-algorithm
  r = rgb[0] / 255
  g = rgb[1] / 255
  b = rgb[2] / 255
  maxc = max(r, g, b)
  minc = min(r, g, b)
  v = maxc
  if minc == maxc:
      return 0.0, 0.0, v
  s = (maxc-minc) / maxc
  rc = (maxc-r) / (maxc-minc)
  gc = (maxc-g) / (maxc-minc)
  bc = (maxc-b) / (maxc-minc)
  if r == maxc:
      h = 0.0+bc-gc
  elif g == maxc:
      h = 2.0+rc-bc
  else:
      h = 4.0+gc-rc
  h = (h/6.0) % 1.0
  return (h * 360, s * 100, v * 100)

def sort_buttons(buttons: list, sort_type):
  """
  sorttype \n
  0: alphabetical \n
  1: average rgb
  """
  match sort_type:
    case 0:
      return buttons.sort()
    case 1:
      rgbs = [""] * len(buttons)
      hsvs = [""] * len(buttons)
      for index in range(len(buttons)):
        rgbs[index] = get_dominant_rgb(BUTTON_DIR + SLASH + buttons[index])
        hsvs[index] = rgb_to_hsv(rgbs[index])
        if IS_DEBUG:
          test_get_dominant_rgb(buttons[index], rgbs[index])
      joint_lists = zip(hsvs, buttons)
      sorted_lists = sorted(joint_lists)
      _, sorted_images = zip(*sorted_lists)
      return sorted_images
    case 2:
      shuffle(buttons)
      return buttons

def format_color(color):
  formatted_color = (str(hex(round(color))[2:]).upper()).rjust(2,'0')
  # print(formatted_color)
  return formatted_color

def test_get_dominant_rgb(image, color):
  print("################################")
  print("color: " + str(color[0]) + "," + str(color[1]) + "," + str(color[2]))
  print("color: " + format_color(color[0]) + format_color(color[1]) + format_color(color[2]))
  print("image: " + image)

if __name__ == "__main__":
  main()
  
    

  



