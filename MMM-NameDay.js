Module.register("MMM-NameDay", {
    
    defaults: {
        mode: "today", 			        // today,tomorrow, yesterday, namedays, getdate,
        country: "", 			        // us, cz, sk, pl, fr, hu, hr, se, at, it, de, es, none
        day: "",  				        // 1-31
        month: "", 				        // 1-12
        name: "", 
        wrapperSize: "0.75em",
        textCellSize: "1.1em",
        updateInterval: 5 * 60 * 1000, 	// every 5 minutes
        initialLoadDelay: 3000,
        retryDelay: 5000,
        lang: config.language,
        tableClass: "small",
        },

        getTranslations: function() {
            return { 
                en: "translations/en.json",
                cs: "translations/cs.json",
                de: "translations/de.json",
                es: "translations/es.json",
                fr: "translations/fr.json",
                hr: "translations/hr.json",
                hu: "translations/hu.json",
                it: "translations/it.json",
                pl: "translations/pl.json",
                sv: "translations/sv.json"
            };
        },
        
        getStyles: function() {
            return [ "MMM-NameDay.css" ];
        },
        
        start: function() {
            Log.info("Starting module: " + this.name);
            this.names = [];
            this.loaded = false;
            this.scheduleUpdate(this.config.initialLoadDelay);
            this.updateTimer = null;
            if(this.config.country === "default") {
                if(this.config.lang === "en") {
                    this.config.country = "us";
                }
                else if(this.config.lang === "cs") {
                    this.config.country = "cz";
                }
                else if(this.config.lang === "sv") {
                    this.config.country = "se";
                }
                else if(Array.isArray(this.config.country) === false) {
                    this.config.country = this.config.lang;
                }	
            }
        },
        
        getURL: function() {
            const baseUrl = "https://api.abalin.net/";
            let url;
            if (this.config.mode === "today" || this.config.mode === "tomorrow" || this.config.mode === "yesterday") {
                if (this.config.country !== "" && Array.isArray(this.config.country) === false) {
                    url = baseUrl + this.config.mode + "?country=" + this.config.country;
                } else {
                    url = baseUrl + this.config.mode
                }
            }
            else if (this.config.mode === "namedays") {
                if (this.config.day !== "" && this.config.month !== "") {
                    if (this.config.country !== "" && Array.isArray(this.config.country) === false) {
                        url = baseUrl + this.config.mode + "?day=" + this.config.day + "&month=" + this.config.month + "&country=" + this.config.country;
                    } else {
                        url = baseUrl + this.config.mode + "?day=" + this.config.day + "&month=" + this.config.month;
                    }
                } else {
                    Log.error(self.name + ": Month or day not inserted!!");
                    return;
                }
            }
            else if (this.config.mode === "getdate") {
                if (this.config.name !== "" && this.config.country !== "") {
                    url = baseUrl + this.config.mode + "?name=" + this.config.name + "&calendar=" + this.config.country;
                }
                else {
                    Log.error(self.name + ": Country not inserted!!");
                    return;
                }
            }
            else {
                this.hide(1000, { lockString: this.identifier });
                return;
            }
            Log.info("Returned URL: " + url);
            return url;
        },
        
        getData: function() {
            const self = this;
            const retry = true;
            const dataRequest = new XMLHttpRequest();
            const url = this.getURL();
            Log.info("Fetched URL: " + url);			
            dataRequest.open("GET", url, true);
            dataRequest.onreadystatechange = function() {
                if(this.readyState === 4) {
                    if(this.status >= 200 && this.status < 400) {
                        self.names = JSON.parse(this.response);
                        self.loaded = true;
                        self.updateDom();
                    } 
                    else {
                        Log.error(self.name + ": Could not load namedays.");
                    }
                    if (retry) {
                        self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
                    }
                }
            };
            dataRequest.send();
        },
        
        getDom: function() {
            let message;
            let namesCell;
            let countryCell;
            let showCountries;
            let table;
            let textCell;
            let row;
            const wrapper = document.createElement("div");
            wrapper.className = "nameDayWrapper";
            wrapper.style.fontSize = this.config.wrapperSize;
            const countriesCodes = ["us", "cz", "sk", "pl", "fr", "hu", "hr", "se", "at", "it", "de", "es"];

            let skip = false;

            if (this.config.mode === "") {
                wrapper.innerHTML = this.translate("SET_CORRECT_MODE") + this.name + ".";
                wrapper.className = "dimmed light small";
                return wrapper;
            }
            
            if (!this.loaded) {
                wrapper.innerHTML = this.translate("LOADING");
                wrapper.className = "dimmed light small";
                return wrapper;
            }

            // GETDATE
            if(this.config.mode === "getdate") {
                table = document.createElement("table");
                table.className = this.config.tableClass;

                row = document.createElement("tr");
                table.appendChild(row);

                textCell = document.createElement("td");
                textCell.className = "textCell";
                textCell.setAttribute("colspan","2");
                textCell.style.fontSize = this.config.textCellSize;
                textCell.innerHTML = this.translate("NAMEDAY_GETDATE");
                row.appendChild(textCell);
                    
                for(let x = 0; x < this.names.data.length; x++) {
                    row = document.createElement("tr");
                    table.appendChild(row);

                    countryCell = document.createElement("td");
                    countryCell.className = "date";
                    countryCell.innerHTML = this.names.data[x].dates.day + "." + this.names.data[x].dates.month;
                    row.appendChild(countryCell);

                    namesCell = document.createElement("td");
                    namesCell.className = "name";
                    namesCell.innerHTML = this.names.data[x].namedays.hu;
                    row.appendChild(namesCell);
                }
                return table;
            }
            
            // TODAY, TOMORROW, YESTERDAY, NAMEDAYS - WITHOUT COUNTRY SET
            let countries;
            if (this.config.country === "" || Array.isArray(this.config.country) === true || skip === true) {
                table = document.createElement("table");
                table.className = this.config.tableClass;

                let text = "";
                if (this.config.mode === "today") {
                    text = this.translate("NAMEDAY_TODAY_TABLE");
                }
                else if (this.config.mode === "tomorrow") {
                    text = this.translate("NAMEDAY_TOMORROW_TABLE");
                }
                else if (this.config.mode === "yesterday") {
                    text = this.translate("NAMEDAY_YESTERDAY_TABLE");
                }
                else if (this.config.mode === "namedays") {
                    text = this.translate("NAMEDAY_NAMEDAYS_TABLE").replace("$DAY$", this.config.day).replace("$MONTH$", this.config.month);
                }

                row = document.createElement("tr");
                table.appendChild(row);

                textCell = document.createElement("th");
                textCell.className = "textCell";
                textCell.setAttribute("colspan", "2");
                textCell.style.fontSize = this.config.textCellSize;
                textCell.innerHTML = text;
                row.appendChild(textCell);
                if (Array.isArray(this.config.country) === true && this.config.country.length > 0) {
                    showCountries = this.config.country;
                }
                else {
                    showCountries = countriesCodes;
                }

                countries = this.translate("COUNTRIES").split(",");
                for (let i = 0; i < showCountries.length; i++) {
                    if (countriesCodes.indexOf(showCountries[i]) > -1) {
                        const countryIndex = countriesCodes.indexOf(showCountries[i]);
                        const show = countriesCodes[countryIndex];
                        row = document.createElement("tr");
                        table.appendChild(row);

                        countryCell = document.createElement("td");
                        countryCell.className = "country";
                        countryCell.innerHTML = countries[countryIndex];
                        row.appendChild(countryCell);

                        namesCell = document.createElement("td");
                        namesCell.className = "name";
                        namesCell.innerHTML = this.names.data.namedays[show];
                        row.appendChild(namesCell);
                    }
                    else {
                        Log.error(this.translate("ARRAY_ERROR").replace("$WRONG_COUNTRY$", showCountries[i]));
                    }
                }
                return table;
            }
            
            // TODAY, TOMORROW, YESTERDAY, NAMEDAYS - WITH COUNTRY SET
            if(this.config.country !== "" && countriesCodes.indexOf(this.config.country) > -1 && Array.isArray(this.config.country) === false) {
                if(this.config.mode === "today") {
                    message = this.translate("NAMEDAY_TODAY").replace("$NAME$", this.names.data.namedays[this.config.country]);
                } 
                else if(this.config.mode === "tomorrow") {
                    message = this.translate("NAMEDAY_TOMORROW").replace("$NAME$", this.names.data.namedays[this.config.country]);
                } 
                else if(this.config.mode === "yesterday") {
                    message = this.translate("NAMEDAY_YESTERDAY").replace("$NAME$", this.names.data.namedays[this.config.country]);
                } 
                else if(this.config.mode === "namedays") {
                    message = this.translate("NAMEDAY_NAMEDAYS").replace("$DAY$", this.config.day).replace("$MONTH$", this.config.month).replace("$NAME$", this.names.data.namedays[this.config.country]);
                } 	
                wrapper.innerHTML = message;
                return wrapper;
            } 
            else {
                Log.error(this.translate("COUNTRY_ERROR"));
            }
        },
        
        scheduleUpdate: function(delay) {
            let nextLoad = this.config.updateInterval;
            if (typeof delay !== "undefined" && delay >= 0) {
                nextLoad = delay;
            }
            const self = this;
            clearTimeout(this.updateTimer);
            this.updateTimer = setTimeout(function() {
                self.getData();
            }, nextLoad);
        },
    });
