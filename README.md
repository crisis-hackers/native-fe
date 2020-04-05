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
After you do, copy it to the
``
app/App_Resources/Android/src/main/res/values/nativescript_google_maps_api.xml.example
`` 
file and remove the 'example' file extension.