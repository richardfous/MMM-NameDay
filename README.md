# MMM-NameDay
Module for showing name days. 

![module MMM-NameDay](screenshots/screenshot.png)

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
| Option                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ```mode```              | Filter available modes.<br/> **Type:**```string```<br/> **Default:**```today```<br/>**Possible values:** Get a name day for today ```today```, nameday for tomorrow ```tomorrow```, nameday for yesterday ```yesterday```. Search nameday by name ```getdate```. Get a nameday for a specific day ```namedays```.<br/> This option is **REQUIRED**                                                                                                                                                                                                                                                                                                                                                                                    |
| ```country```           | Show name day for a specific country. All countries are shown if no country is selected. Array of countries can be inserted to show name days for selected countries. This option can be used with all modes.<br/> **Type:**```string``` or ```array of strings```<br/> **Default:**```""```<br/>**Possible values:** Empty string ```""```,<br/>Set country according to the language specified in main config file```"default"```,<br/> String with country code, such as: ```"us"```,```"cz"```,```"sk"```,```"pl"```,```"fr"```,```"hu"```,```"hr"```,```"se"```,```"at"```,```"it"```,```"de"```,```"es"```,```"lv"```,```"ru"```,```"lt"```,```"gr"```,```"fi"```,```"ee"```,```"dk"```,```"bg"```,<br/> Array of above listed strings, for example:```["us","pl","cz"]``` etc. <br/>This option is **NOT REQUIRED**    |
| ```day```               | Day in a month.<br/> **Type:**```integer```<br/> **Default:**```""```<br/>**Possible values:** ```1```-```31```.<br/> This option is **REQUIRED** only when ```namedays``` mode is selected.   |
| ```month```             | Month in a year.<br/> **Type:**```integer```<br/> **Default:**```""```<br/>**Possible values:** ```1```-```12```.<br/> This option is **REQUIRED** only when ```namedays``` mode is selected.   |
| ```name```              | Search for a name.<br/> **Type:**```string```<br/> **Default:**```""```<br/>This option is **REQUIRED** only when ```getdate``` mode is selected.   |
| ```wrapperSize```       | Set a specific font-size for text that is rendered when ```country``` option is not ```""``` .<br/> **Type:**```string```<br/> **Default:**```"0.75em"```<br/>**Possible values:** Any font-size value.<br/> This option is **NOT REQUIRED**    |
| ```textCellSize```      | Set a specific font-size for the title of a rendered table when ```country``` option is ```""``` .<br/> **Type:**```string```<br/> **Default:**```"1.1em"```<br/>**Possible values:** Any font-size value.<br/> This option is **NOT REQUIRED**    |
| ```updateInterval```    | Interval after which new content is fetched. This value is in milliseconds.<br/> **Type:**```integer```<br/> **Default:**```5*60*1000```(5 minutes)<br/>**Possible values:** ```1000```-```86400000```.<br/> This option is **NOT REQUIRED** |
| ```initialLoadDelay```  | Delay before loading the module. The value is in milliseconds.<br/> **Type:**```integer```<br/> **Default:**```3000```(3 seconds)<br/>**Possible values:** ```1000```-```5000```.<br/> This option is **NOT REQUIRED**. |
| ```retryDelay```        | The delay before retrying after failed request.<br/> **Type:**```integer```<br/> **Default:**```5000```(5 seconds)<br/>**Possible values:** ```1000```-```60000```.<br/> This option is **NOT REQUIRED**. |
| ```lang```              | This option lets you set a specific language to be used in this module.<br/> **Type:**```string```<br/> **Default:**```config.language```(default language set in config.js)<br/> This option is **NOT REQUIRED**. |
| ```tableClass```        | Set the size of tables rendered on screen.<br/> **Type:**```string```<br/> **Default:**```small```<br/>**Possible values:** ```xsmall```,```small```,```medium```,```large```,```xlarge```.<br/> This option is **NOT REQUIRED**. |

## Dependencies 
You can find API used in this module [here](https://api.abalin.net).

## Issues
If you find any issues with this module, feel free to open a GitHub issue in this repository. 
