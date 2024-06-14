local mqtt = require("mqtt")
local json = require("dkjson")
local lfs = require("lfs")

local client = mqtt.client{
  uri = "mqtt://YOUR_BROKER_ADDRESS",
  clean = true,
}

client:on{
  connect = function(connack)
    print("Connected:", connack)
    client:subscribe("test/topic")
  end,

  message = function(msg)
    print("Topic:", msg.topic, "Payload:", msg.payload)
    local data = {message = msg.payload}
    local json_data = json.encode(data)
    
    local file = io.open("/tmp/message.json", "w")
    file:write(json_data)
    file:close()
    
    os.execute("ls /tmp")
    os.execute("free")
    os.execute("sudo reboot")
  end,
}

client:connect()
mqtt.run_ioloop(client)
