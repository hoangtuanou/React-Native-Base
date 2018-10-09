#!/usr/bin/env bash

# Example: Change bundle name of an iOS app for non-production
if [ "$APPCENTER_BRANCH" != "master" ];
then
    python3 src/config/update_config.py
fi