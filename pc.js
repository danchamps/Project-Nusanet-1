	/*********************************
		pcJS v1.0.1
		<Open Source Project>
		For Education Purpose Only
		Contributor 
		(Top -> Down) : (First -> Last)
		* Johan Surya
		==========================
		Please Respect Contributor
		==========================
	**********************************/
	
	function arraysort(array){
		for(var i = 0; i<array.length; i++){
			temp = array[i]
			tempkey = i
			for(var j=i; j<array.length; j++){
				if(temp > array[j]){
					tempkey = j
					temp = array[j]
				}
			}
			tempsaved = temp
			array[tempkey] = array[i]
			array[i] = temp
		}
		return array
	}

	function toRadians(angle) {
		  return angle * (Math.PI / 180);
	}
	
	function warning(text){
		console.warn(text)
	}
	
	function info(text){
		console.info(text)
	}
	
	function error(text){
		console.error(text)
	}
	
	function log(text){
		console.log(text)
	}
	
	function pc(canvas){
		this.canvas = canvas
		this.context = this.canvas.getContext('2d')
		this.width = 0
		this.height = 0
		this.imgsrc = ""
		this.image2read = function(){
			this.originalLakeImageData = this.context.getImageData(0,0, this.width, this.height)
			this.resultArr = new Array()
			this.tempArr = new Array()
			this.tempCount = 0
			for(var i=0; i<this.originalLakeImageData.data.length; i++){
				this.tempCount++
				this.tempArr.push(this.originalLakeImageData.data[i])
				if(this.tempCount == 4){
					this.resultArr.push(this.tempArr)
					this.tempArr = []
					this.tempCount = 0
				}
			}
			info('image2read Success ('+this.imgsrc+') : '+this.width+'x'+this.height)
			return this.resultArr
		}
		
		this.filter2read = function(w, h){
			this.width = w
			this.height = h
			this.originalLakeImageData = this.context.getImageData(0,0, this.width, this.height)
			this.resultArr = new Array()
			this.tempArr = new Array()
			this.tempCount = 0
			for(var i=0; i<this.originalLakeImageData.data.length; i++){
				this.tempCount++
				this.tempArr.push(this.originalLakeImageData.data[i])
				if(this.tempCount == 4){
					this.resultArr.push(this.tempArr)
					this.tempArr = []
					this.tempCount = 0
				}
			}
			info('image2read Success ('+this.imgsrc+') : '+this.width+'x'+this.height)
			return this.resultArr
		}
		
		this.blank2canvas = function(w,h){
			this.width = w
			this.height = h
			this.canvas.width = this.width
			this.canvas.height = this.height
			this.imgsrc = "Blank"
			info('blank2canvas Success (Blank '+w+'x'+h+')')
		}
		
		this.image2canvas = function(imgsrc){
			var imageObj = new Image()
			var parent = this
			var new_width
			var new_height
			
			imageObj.onload = function() {
				parent.canvas.width = 300
				parent.canvas.height = 300
				
				if (imageObj.width < 300 || imageObj.height < 300){
					new_width = imageObj.width
					new_height = imageObj.height
					parent.context.drawImage(imageObj, 0, 0)
				}
				else{
					if (imageObj.height > imageObj.width){
						new_height = 300
						new_width = imageObj.width * 300 / imageObj.height	
					}
					else if (imageObj.width > imageObj.height){
						new_width = 300
						new_height = imageObj.height * 300 / imageObj.width	
					}
					else{
						new_width = imageObj.width
						new_height = imageObj.height
					}
					parent.context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, (300-new_width)/2, (300-new_height)/2, new_width, new_height)
					parent.width = imageObj.width
					parent.height = imageObj.height
				}
				parent.width = imageObj.width
				parent.height = imageObj.height
				info('image2canvas Success ('+imgsrc+')')
			}
			imageObj.src = imgsrc
			this.imgsrc = imgsrc
		}
		
		this.image2original = function(){
			if(this.imgsrc == ""){
				error("image2original Failed : Image Source not found!")
			}
			else if(this.imgsrc == "blank"){
				this.blank2canvas(this.width, this.height)
				info("image2original Success")
			}
			else{
				this.image2canvas(this.imgsrc)
				info("image2original Success")
			}
		}
		
		this.array2canvas = function(arr){
			this.imageData = this.context.getImageData(0, 0, this.width, this.height)
			if(this.imageData.data.length != arr.length*4){
				error("array2canvas Failed to Execute")
				return false
			}
			for(var i = 0; i < arr.length; i++){
				this.imageData.data[(i*4)] = arr[i][0]
				this.imageData.data[(i*4)+1] = arr[i][1]
				this.imageData.data[(i*4)+2] = arr[i][2]
				this.imageData.data[(i*4)+3] = arr[i][3]
			}
			this.context.clearRect(0, 0, this.width, this.height)
			this.context.putImageData(this.imageData, 0, 0)
			info('Array2Canvas Success ('+this.imgsrc+')')
		}
		
		this.i2x = function(i){
			return (i % this.width)
		}
		
		this.i2y = function(i){
			return ((i - (i % this.width))/ this.width)
		}
		
		this.xy2i = function(x,y){
			return (y * this.width) + (x)
		}
	
	}