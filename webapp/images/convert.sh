echo $1

# convert  -resize x100 -gravity center  $1  -trim -flatten -background white -transparent white  -verbose -crop 100x100+0+0 $2/angularapp/src/favicon.svg

convert  -resize x72 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 72x72+0+0 icon-72.png

convert  -resize x96 -gravity center  $1  -flatten -background white  -transparent white -verbose -crop 96x96+0+0 icon-96.png

convert  -resize x120 -gravity center  $1  -flatten -background white  -transparent white -verbose -crop 120x120+0+0 icon-120.png

convert  -resize x128 -gravity center  $1  -flatten -background white  -transparent white -verbose -crop 128x128+0+0 icon-128.png

convert  -resize x144 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 144x144+0+0 icon-144.png


convert  -resize x152 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 152x152+0+0 icon-152.png

convert  -resize x180 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 180x180+0+0 icon-180.png

convert  -resize x384 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 384x384+0+0 icon-384.png

convert  -resize x192 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 192x192+0+0 icon-192.png

convert  -resize x512 -gravity center  $1  -flatten -background white  -transparent white  -verbose -crop 512x512+0+0 icon-512.png
