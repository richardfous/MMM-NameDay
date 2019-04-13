# MMM-NameDay
Module for showing name days. 

![module MMM-NameDay](screenshot.png)

## Installation
Navigate into MagicMirror's Module folder using termial:
```
cd ~/MagicMirror/modules
```
Clone this repository using following command: 
```
git clone https://github.com/RichieCZ/MMM-NameDay.git
```
Add the following text to ```MagicMirror/config/config.js``` to activate the module.
```
{
    module: "MMM-NameDay",
    position: "top_left", // You can change this to your desired position.
    config: {
        //Here you can insert options listed below.
        }
},
```
## Configuration Options
| Option  | Description |
| ------------- | ------------- |
| ```mode```  | Filter available modes.<br/> **Type:**```string```<br/> **Default:**```today```<br/>**Possible values:** Get a name day for today ```today```, nameday for tomorrow ```tomorrow```, nameday for yesterday ```yesterday```. Search nameday by name ```getdate```. Get a nameday for a specific day ```namedays```.<br/> This option is **REQUIRED**   |
| ```country```  | Show name day for a specific country. All countries are shown if no country is selected. This option can be used with all modes.<br/> **Type:**```string```<br/> **Default:**```""```<br/>**Possible values:** ```us```,```cz```,```sk```,```pl```,```fr```,```hu```,```hr```,```se```,```at```,```it```,```de```,```es```,```""```.<br/> This option is **NOT REQUIRED**    |
| ```day```  | Day in a month.<br/> **Type:**```integer```<br/> **Default:**```""```<br/>**Possible values:** ```1```-```31```.<br/> This option is **REQUIRED** only when ```namedays``` mode is selected.   |
| ```month```  | Month in a year.<br/> **Type:**```integer```<br/> **Default:**```""```<br/>**Possible values:** ```1```-```12```.<br/> This option is **REQUIRED** only when ```namedays``` mode is selected.   |
| ```name```  | Search for a name.<br/> **Type:**```string```<br/> **Default:**```""```<br/>This option is **REQUIRED** only when ```getdate``` mode is selected.   |
| ```updateInterval```  | Interval after which new content is fetched. This value is in milliseconds.<br/> **Type:**```integer```<br/> **Default:**```5*60*1000```(5 minutes)<br/>**Possible values:** ```1000```-```86400000```.<br/> This option is **NOT REQUIRED** |
| ```initialLoadDelay```  | Delay before loading the module. The value is in milliseconds.<br/> **Type:**```integer```<br/> **Default:**```3000```(3 seconds)<br/>**Possible values:** ```1000```-```5000```.<br/> This option is **NOT REQUIRED**. |
| ```retryDelay```  | The delay before retrying after failed request.<br/> **Type:**```integer```<br/> **Default:**```5000```(5 seconds)<br/>**Possible values:** ```1000```-```60000```.<br/> This option is **NOT REQUIRED**. |
| ```lang```  | This option lets you set a specific language to be used in this module.<br/> **Type:**```string```<br/> **Default:**```config.language```(default language set in config.js)<br/> This option is **NOT REQUIRED**. |
| ```tableClass```  | Set the size of tables rendered on screen.<br/> **Type:**```string```<br/> **Default:**```small```<br/>**Possible values:** ```xsmall```,```small```,```medium```,```large```,```xlarge```.<br/> This option is **NOT REQUIRED**. |

## Multiple Instances of the Module
You can run multiple instances of this module. You can do this by adding another entry of this module into ```MagicMirror/config/config.js```.

## Dependencies 
You can find API used in this module [here](https://api.abalin.net).

There is a CORS problem with this API, so in order to make this module work a proxy server is used. The proxy server is available on this [website](https://github.com/Freeboard/thingproxy). There is a limitation of 100000 characters per request and a limitation of 10 requests/second.

## Issues
If you find any issues with this module, feel free to open a GitHub issue in this repository. 
