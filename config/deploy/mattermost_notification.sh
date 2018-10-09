
payload='{
  "channel": "ci",
  "username": "App Center Bot",
  "text": "Build YogaWorks '$VERSION_NO'.'$BUILD_NO' . @here :tada: '$APPCENTER_OUTPUT_DIRECTORY'"
}'

curl -i -X POST --data-urlencode "payload=$payload" https://internalchat.sutrix.com/hooks/t4oebs71mbbrtypgcphwypspca