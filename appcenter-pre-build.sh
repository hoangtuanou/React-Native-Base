#!/usr/bin/env bash

if [ "$APPCENTER_BRANCH" != "master" ];
then
    python3 config/deploy/update_config.py
fi