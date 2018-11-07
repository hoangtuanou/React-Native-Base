
payload='{
  "channel": "ci",
  "username": "App Center Bot",
  "text": "Build YogaWorks IOS '$VERSION_NO'.'$BUILD_NO' succeed. :tada: :tada: :tada: @here [(install)](https://appcenter.ms/orgs/YogaWorks/apps/YogaWorks)"
}'

echo $APPCENTER_OUTPUT_DIRECTORY

if [ $APPCENTER_ANDROID_VARIANT ]
then
  payload='{
    "channel": "ci",
    "username": "App Center Bot",
    "text": "Build YogaWorks ANDROID '$VERSION_NO'.'$BUILD_NO' succeed. :tada: :tada: :tada: @here [(install)](https://appcenter.ms/orgs/YogaWorks/apps/YogaWorks-1)"
  }'
fi

curl -i -X POST --data-urlencode "payload=$payload" https://internalchat.sutrix.com/hooks/t4oebs71mbbrtypgcphwypspca