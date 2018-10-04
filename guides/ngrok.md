# Tunnel to localhost
Ngrok allows you to expose a web server running on your local machine to the internet. It's very handy for developing APIs, in particular when working with Twilio.


## Install

Follow the quickstart guide [here](https://ngrok.com/download).

## Run Your Server

First fire up your application, with rails it would look like this:

```
rails server 3000
```

N.B. You will need the port number to instruct ngrok


## Tunnel In

Once your server is running, all that's left is to expose the port to the internet with ngrok:

```
ngrok http 3000
```

Where `http` is the protocol and `3000` is the port number. Ngrok will display a UI in your terminal with the public URL of your tunnel and other connection information.


## Inspecting your Traffic
Ngrok provides a real-time web UI where you can introspect all traffic running over your tunnels. After you've started ngrok, just open http://localhost:4040 in a web browser to inspect request details.


## Advanced Configuration
There are plenty more configuration options, including custom domain names etc. For more details, you can check the ngrok docs https://ngrok.com/docs
