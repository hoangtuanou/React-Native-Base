#!/usr/bin/env bash

if [ "$APPCENTER_BRANCH" != "master" ];
then
    sh config/deploy/mattermost_notification.sh
fi