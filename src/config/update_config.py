import os
import json
import plistlib

env = os.environ

versionStr = env['VERSION_NO'] + '.' + env['BUILD_NO']

pl = plistlib.readPlist("../../ios/YogaWorks/Info.plist")
pl['CFBundleShortVersionString'] = versionStr
pl['CFBundleVersion'] = versionStr
plistlib.writePlist(pl, "../../ios/YogaWorks/Info.plist")

with open("../../package.json", "r") as jsonFile:
    data = json.load(jsonFile)
    data['version'] = versionStr

with open("../../package.json", "w") as jsonFile:
    json.dump(data, jsonFile, indent=2, separators=(',', ': '))