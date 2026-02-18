import os
from random import shuffle
from colorthief import ColorThief

def main():
  WORKING_DIR = os.getcwd()
  HTML_SRC_DIR = 'buttons/'
  OUTPUT_TXT_PATH = WORKING_DIR + '/tools/output.txt'
  BLACKLIST_TXT_PATH = WORKING_DIR + '/tools/button-blacklist.txt'
  BUTTONS_DIR = WORKING_DIR + '/src/buttons/'
  LINE_BREAK = '\n'
  button_list = os.listdir(WORKING_DIR + "/src/buttons/")

  with open(OUTPUT_TXT_PATH, "w") as f:
    blacklist = get_blacklist(BLACKLIST_TXT_PATH)
    button_list = sort_buttons(button_list, 1, BUTTONS_DIR)
    for button in button_list:
      if button not in blacklist:
        f.write(format_html(HTML_SRC_DIR + button) + LINE_BREAK)

def format_html(html_src):
  file_name = (os.path.splitext(html_src)[0]).replace("-" , " ")
  file_name = file_name[file_name.rfind("/") + 1:len(file_name)]
  return f'<img src="{html_src}" alt="{file_name}" title="{file_name}">'

def get_blacklist(path):
  with open(path, "r") as f:
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

def sort_buttons(buttons: list, sort_type: int, button_dir):
  """
  sorttype \n
  0: alphabetical \n
  1: average rgb
  2: randomize
  """
  IS_DEBUG = False
  match sort_type:
    case 0:
      return buttons.sort()
    case 1:
      rgbs = [""] * len(buttons)
      hsvs = [""] * len(buttons)
      for index in range(len(buttons)):
        rgbs[index] = get_dominant_rgb(button_dir + buttons[index])
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
  
    

  



