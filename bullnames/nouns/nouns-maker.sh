#!/bin/bash

endings=("shave" "smoke" "cat" "letter" "mom" "pump" "wash" "soap" "dream" "plan" "wish" "sniff" "hand" "talk" "sin" "heart" "day" "slap" "drugs" "pony" "lock" "beer" "pot" "drive" "Laugh" "fool" "trip" "port" "buzz" "void" "hole" "plane" "lip" "shop" "rebel" "tooth" "nail" "snail" "shit" "die" "tax" "dog" "dock" "stalk" "talk" "touch" "wire" "sucker")

for t in ${endings[@]}; do
  convert transparent_template.png -font Helvetica-Bold -weight 700  -pointsize 120 -draw "gravity east fill black text 0,5 '$t' " $t.png
done
