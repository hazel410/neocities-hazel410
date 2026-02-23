import os


FUNCTION_NAME = 'getButton'
LINK_VAR = 'link'
HTML_VAR = 'html'
LINKED_BUTTONS_DICT = {
  'a-tiny-space.gif' : 'https://starrs.neocities.org/tinyspace/',
  'centiskorch.png' : 'https://centiskor.ch',
  'petra-pixel.png' : 'https://petrapixel.neocities.org/',
  'seafare.png' : 'https://seafare.neocities.org/',
  'tacky-villain.png' : 'https://tackyvillain.neocities.org',
  'the-nonexistent-fandoms-fandom.gif' : 'https://nonexistentfandomsfandom.neocities.org/',
  'venula.gif' : 'https://venula.neocities.org/'
}

def generateButtons(button_dir):
  linked_buttons =  list(LINKED_BUTTONS_DICT.keys())
  button_list = os.listdir(button_dir)
  unlinkedJS = ''
  linkedJS = ''

  for button in button_list:
    if not button in linked_buttons:
      unlinkedJS += f'{HTML_VAR} += {FUNCTION_NAME}(\'{button}\');\n'
    else:
      linkedJS += f'{HTML_VAR} += {FUNCTION_NAME}(\'{button}\', {LINK_VAR}=\'{LINKED_BUTTONS_DICT[button]}\');\n'
  
  return unlinkedJS, linkedJS

if __name__ == "__main__":
  unlinked, linked = generateButtons(os.getcwd() + '/src/buttons/')
  
  print("####################")
  print("# unlinked")
  print("####################")
  print(unlinked)
  print("####################")
  print("# linked")
  print("####################")
  print(linked)

