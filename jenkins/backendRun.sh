echo "> current backend application pid check"
CURRENT_PID=$(ps -ef | grep java | grep ssacre* | awk '{print $2}')
echo "$CURRENT_PID"
if [ -z $CURRENT_PID ]; then
echo "> there is no current backend application"
else
echo "> kill -9 $CURRENT_PID"
sudo kill -9 $CURRENT_PID
sleep 10
fi
echo "> new backend application  start"
nohup java -jar /var/lib/jenkins/workspace/ssacretary/backend/build/libs/ssacretary-0.0.1-SNAPSHOT.jar >> /var/lib/jenkins/workspace/ssacretary/backend/logs/ssacretary.log &