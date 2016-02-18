
    function grayscale(src) { //Creates a canvas element with a grayscale version of the color image
        //alert("hello grayscale");
        //create canvas
        //src = "images/20151223_191253.jpg";
        var canvas = document.createElement('canvas');
        //get its context
        var ctx = canvas.getContext('2d');
        //create empty image
        var imgObj = new Image();
        //start to load image from src url
        imgObj.src = src;
        //resize canvas up to size image size
        canvas.width = imgObj.width;
        canvas.height = imgObj.height;
        //draw image on canvas, full canvas API is described here http://www.whatwg.org/specs/web-apps/current-work/multipage/the-canvas-element.html
        ctx.drawImage(imgObj, 0, 0);
        //get array of image pixels
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        //run through all the pixels
        for (var y = 0; y < imgPixels.height; y++) {
            for (var x = 0; x < imgPixels.width; x++) {
                //here is x and y are multiplied by 4 because every pixel is four bytes: red, green, blue, alpha
                var i = (y * 4) * imgPixels.width + x * 4; //Why is this multiplied by 4?
                //compute average value for colors, this will convert it to bw
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                //set values to array
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }
        //draw pixels according to computed colors
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        return canvas.toDataURL();
    }
