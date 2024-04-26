    try {
    window['BarcodeDetector'].getSupportedFormats()
  } catch {
    window['BarcodeDetector'] = barcodeDetectorPolyfill.BarcodeDetectorPolyfill
  }
  const barcodeDetector = new BarcodeDetector({
    formats: [
      'qr_code',
      'code_128',
      'code_39',
      'code_93',
      'codabar',
      'ean_13',
      'ean_8',
      'itf',
      'upc_a',
      'upc_e'
    ]
  });
  
  window.onload = async () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
  
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment'
      }
    }).then(stream => {
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        requestAnimationFrame(tick);
      };
    });
  
    function tick() {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      barcodeDetector.detect(canvas).then(barcodes => {
        barcodes.forEach(barcode => {
            document.getElementById('barcode').innerHTML = barcode.rawValue;
        });
        requestAnimationFrame(tick);
      });
    }
    // const image = new Image();
    // image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/EAN13.svg/1200px-EAN13.svg.png';
    // image.crossOrigin = "anonymous";
    // const canvas = document.getElementById('canvas');
    // const context = canvas.getContext('2d');
  
    // image.onload = () => {
    //   canvas.width = image.width;
    //   canvas.height = image.height;
    //   context.drawImage(image, 0, 0, image.width, image.height);
    //   barcodeDetector.detect(canvas).then(barcodes => {
    //     barcodes.forEach(barcode => {
    //       console.log(barcode.rawValue);
    //     });
    //   });
    // };
    //agregar la imagen a canvas
    } // Add this closing curly brace