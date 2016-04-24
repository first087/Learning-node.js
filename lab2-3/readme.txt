#Install pm2 tools
npm install pm2 -g

#Start application
pm2 start [script_name.js] --name "app-name"
pm2 start [script_name.js] -i 0
pm2 start [script_name.js] -i max

#Monitoring and control application
pm2 list
pm2 jlist
pm2 prettylist
pm2 describe [app_id]
pm2 updatePM2
pm2 ping

#monitoring
pm2 monit

#Logging
pm2 logs [--raw]
pm2 flush
pm2 reloadLogs

#Stop application
$ pm2 stop all           # Stop all processes
$ pm2 restart all        # Restart all processes

$ pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)
$ pm2 gracefulReload all # Send exit message then reload (for networked apps)

$ pm2 stop 0             # Stop specific process id
$ pm2 restart 0          # Restart specific process id



$ pm2 delete 0           # Will remove process from pm2 list
$ pm2 delete all         # Will remove all processes from pm2 list


สำหรับ Windows Platform
$ npm install pm2-windows-startup -g

$ pm2-startup install

สำหรับ Unix/Linux Platform
$ pm2 startup

Process Autostart จะทำงานหลังจากสั่งบันทึก Process list
$ pm2 save
