import os
import json
import plistlib

env = os.environ

versionStr = env['VERSION_NO'] + '.' + env['BUILD_NO']

pl = plistlib.load("ios/RNbase/Info.plist")
pl['CFBundleShortVersionString'] = versionStr
pl['CFBundleVersion'] = versionStr
plistlib.writePlist(pl, "ios/RNbase/Info.plist")

with open("package.json", "r") as jsonFile:
    data = json.load(jsonFile)
    data['version'] = versionStr

with open("package.json", "w") as jsonFile:
    json.dump(data, jsonFile, indent=2, separators=(',', ': '))