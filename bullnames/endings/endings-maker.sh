#!/bin/bash

endings=("kick" "stop" "able" "hub" "link" "tube" "risk" "now" "job" "scam" "run" "ly" "ify" ".me" ".io" ".app" ".it" ".us" ".coin")

for t in ${endings[@]}; do
  convert transparent_template.png -font Helvetica-Bold -weight 700  -pointsize 120 -draw "gravity west fill black text 0,5 '$t' " $t.png
done
