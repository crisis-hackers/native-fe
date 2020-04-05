# HTC

> Hack The Crisis Slovakia Healthcare Team 3's App

## Usage

``` bash
# Install dependencies
npm install

# Preview on device
tns preview

# Build, watch for changes and run the application
tns run

# Build, watch for changes and debug the application
tns debug <platform>

# Build for production
tns build <platform> --env.production

```

## Important

#### You have to set up the [Goole Maps API key](https://developers.google.com/maps/documentation/android-sdk/get-api-key).
After you do, create a following file
``
app/App_Resources/Android/src/main/res/values/nativescript_google_maps_api.xml
`` 
with this content:
```$xslt
<?xml version="1.0" encoding="utf-8"?>
<resources>
     <string name="nativescript_google_maps_api_key">-- YOUR API KEY HERE --</string>
</resources>
```
where you put your actual API key.