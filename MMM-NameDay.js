Module.register("MMM-NameDay",{
	
	defaults:{
		mode: "today", //today,tomorrow, yesterday, namedays, getdate,  
		country: "", //us, cz, sk, pl, fr, hu, hr, se, at, it, de, es, none
		day: "",  //1-31
		month: "", //1-12
		name: "", 
		wrapperSize: "0.75em",
		textCellSize: "1.1em",
		updateInterval: 5*60*1000, //every 5 minutes
		initialLoadDelay: 3000,
		retryDelay: 5000,
		lang: config.language,
		tableClass: "small",
	
		},
		
		getTranslations: function() {
		return { en: "translations/en.json",
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
		return ["MMM-NameDay.css"];
		},
		
		start: function() {
			Log.info("Starting module: " + this.name);
			this.names = [];
			this.loaded = false;
			this.scheduleUpdate(this.config.initialLoadDelay);
			this.updateTimer = null;
			var url;
			if(this.config.country === "default"){
				if(this.config.lang === "en"){
					this.config.country = "us";
				}else if(this.config.lang === "cs"){
					this.config.country = "cz";
				}else if(this.config.lang === "sv"){
					this.config.country = "se";
				}else if(Array.isArray(this.config.country)==false){
					this.config.country = this.config.lang;
				}	
			}
		},
		
		
		
		getURL: function(){
			var baseUrl = "https://api.abalin.net/get/";
			if (this.config.mode === "today" || this.config.mode === "tomorrow" || this.config.mode === "yesterday"){
				if(this.config.country != "" && Array.isArray(this.config.country)==false){
					url = baseUrl + this.config.mode + "?country=" + this.config.country;
					}else { url = baseUrl + this.config.mode}
			} else if (this.config.mode === "namedays"){
					if(this.config.day != "" && this.config.month != ""){
							if(this.config.country != "" && Array.isArray(this.config.country)==false){url = baseUrl + this.config.mode + "?day=" + this.config.day + "&month=" + this.config.month + "&country=" + this.config.country ;
							}else {url = baseUrl + this.config.mode + "?day=" + this.config.day + "&month=" + this.config.month;}	
					}else {Log.error(self.name + ": Month or day not inserted!!"); 
							return;}	
			} else if (this.config.mode === "getdate"){
						if(this.config.name != "" && this.config.country != ""){
							url = baseUrl + this.config.mode + "?name=" + this.config.name + "&calendar=" + this.config.country;
							}else {Log.error(self.name + ": Country not inserted!!");
									return;}
			} else {this.hide(1000, {lockString:this.identifier});
					return;}
			return url;
		},
		
		getData: function(){
			var self = this;
			var retry = true;
			var dataRequest = new XMLHttpRequest();
			var url = "https://thingproxy.freeboard.io/fetch/" + this.getURL();
			dataRequest.open("GET",url,false);
			dataRequest.onreadystatechange = function() {
			if(this.readyState === 4){
				if(this.status >= 200 && this.status < 400){
					self.processData(JSON.parse(this.response));
				} else {
							Log.error(self.name + ": Could not load name days.");}
				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
			dataRequest.send();
			this.loaded = true;
			this.updateDom();
		},
		
		processData: function(data){
			this.names = data;
			this.loaded = true;
			this.updateDom();
		},
		
		getDom: function(){
			var wrapper = document.createElement("div");
			wrapper.className = "nameDayWrapper";
			wrapper.style.fontSize = this.config.wrapperSize;
			var countriesCodes = ["us","cz","sk","pl","fr","hu","hr","se","at","it","de","es"];
			
			var skip = false;
			
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
			
			if(this.config.mode === "getdate"){
				var table = document.createElement("table");
				table.className = this.config.tableClass;
					
				var row = document.createElement("tr");
				table.appendChild(row);
						
				var textCell = document.createElement("td");
				textCell.className = "textCell";
				textCell.setAttribute("colspan","2");
				textCell.style.fontSize = this.config.textCellSize;
				textCell.innerHTML = this.translate("NAMEDAY_GETDATE");
				row.appendChild(textCell);
					
				for(var x = 0; x < this.names.results.length; x++){
					
					var row = document.createElement("tr");
					table.appendChild(row);
					
					var countryCell = document.createElement("td");
					countryCell.className = "date";
					countryCell.innerHTML = this.names.results[x].day + "." + this.names.results[x].month;
					row.appendChild(countryCell);
					
					var namesCell = document.createElement("td");
					namesCell.className = "name";
					namesCell.innerHTML = this.names.results[x].name;
					row.appendChild(namesCell);
				}
				return table;
			}
			// TODAY, TOMORROW, YESTERDAY, NAMEDAYS - WITHOUT COUNTRY SET
			
			if(this.config.country === "" || Array.isArray(this.config.country)==true || skip == true){
				var table = document.createElement("table");
				table.className = this.config.tableClass;
				
				if(this.config.mode === "today"){
					var text = this.translate("NAMEDAY_TODAY_TABLE");
					} else if(this.config.mode === "tomorrow")
							{var text = this.translate("NAMEDAY_TOMORROW_TABLE");
						} else if(this.config.mode === "yesterday")  
							{var text = this.translate("NAMEDAY_YESTERDAY_TABLE");
								} else if(this.config.mode === "namedays"){
									var text = this.translate("NAMEDAY_NAMEDAYS_TABLE").replace("$DAY$",this.config.day).replace("$MONTH$",this.config.month);
										}		
				
				var row = document.createElement("tr");
				table.appendChild(row);
				
				var textCell = document.createElement("th");
				textCell.className = "textCell";
				textCell.setAttribute("colspan","2");
				textCell.style.fontSize = this.config.textCellSize;
				textCell.innerHTML = text;
				row.appendChild(textCell);
				if (Array.isArray(this.config.country)==true && this.config.country.length > 0){
						showCountries = this.config.country;
					}else{var showCountries = countriesCodes;}
				countries = this.translate("COUNTRIES").split(",");
				for(var i = 0; i < showCountries.length ; i++){
					if(countriesCodes.indexOf(showCountries[i]) > -1){
						var countryIndex = countriesCodes.indexOf(showCountries[i]);
						var show = "name_" + countriesCodes[countryIndex];	
						var row = document.createElement("tr");
						table.appendChild(row);
					
						var countryCell = document.createElement("td");
						countryCell.className = "country";
						countryCell.innerHTML = countries[countryIndex];
						row.appendChild(countryCell);
					
						var namesCell = document.createElement("td");
						namesCell.className = "name";
						namesCell.innerHTML = this.names.data[show];
						row.appendChild(namesCell);
						}
						else {Log.error(this.translate("ARRAY_ERROR").replace("$WRONG_COUNTRY$",showCountries[i]));}
				}	
				return table;
			}
			
			// TODAY, TOMORROW, YESTERDAY, NAMEDAYS - WITH COUNTRY SET
			
			if(this.config.country != "" && countriesCodes.indexOf(this.config.country) > -1 && Array.isArray(this.config.country)==false){
				var show = "name_" + this.config.country;		
				if(this.config.mode === "today"){
				var message = this.translate("NAMEDAY_TODAY").replace("$NAME$",this.names.data[show]);
				} else if(this.config.mode === "tomorrow")
						{var message = this.translate("NAMEDAY_TOMORROW").replace("$NAME$",this.names.data[show]); 
					} else if(this.config.mode === "yesterday") 
							{var message = this.translate("NAMEDAY_YESTERDAY").replace("$NAME$",this.names.data[show]);
								} else if(this.config.mode === "namedays"){
									var message = this.translate("NAMEDAY_NAMEDAYS").replace("$DAY$",this.config.day).replace("$MONTH$",this.config.month).replace("$NAME$",this.names.data[show]);
									} 	
				
				wrapper.innerHTML = message;
				return wrapper;
			} else {
					Log.error(this.translate("COUNTRY_ERROR"));
					skip = true;
					}
		},
		
		scheduleUpdate: function(delay) {
			var nextLoad = this.config.updateInterval;
			if (typeof delay !== "undefined" && delay >= 0) {
				nextLoad = delay;
			}

			var self = this;
			clearTimeout(this.updateTimer);
			this.updateTimer = setTimeout(function() {
				self.getData();
			}, nextLoad);
		},

	
	});
