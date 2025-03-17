
function createQRCodeImage(url, qrContainer) {
  // Generate the QR code inside the container
  new QRCode(qrContainer, {
      text: url,
      width: 128,
      height: 128,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
  });

  // The QR code library creates a table-based QR code by default.
  // Extract the 'img' element if it exists.
  const qrImage = qrContainer.querySelector('img');
  console.log(qrImage);
  
  // If an 'img' element is not created, you might be using a library version or configuration
  // that generates a canvas or SVG instead. You need to handle those cases depending on your requirements.
  // For demonstration, let's assume an 'img' is generated.

  return qrImage;
}


document.addEventListener("DOMContentLoaded", function() {
  // Create a URLSearchParams object from the current URL
  const params = new URLSearchParams(window.location.search);
  
  // email --------------
  const email = params.get('email');
  
  // Display the parameter value on the page
  if (email !== null) {
      document.getElementById('email').textContent = `${email}`;
      document.getElementById('email').href = `mailto:${email}`;
  } else {
      document.getElementById('email').textContent = `email not provided`;
  }

  // view qr code id requested --------------
  const portraitContainer = document.getElementById('portrait-container');
  const qrCodeContainer = document.getElementById("qr-code-container");
  const qrjsContainer = document.getElementById("qrjs-container");

  // generate qr code image
  const url = `https://dkoerner.github.io/esri-links/contact-cards/dkoerner/card.html?email=${email}`;
  const img = createQRCodeImage(url, qrjsContainer);

  const newImg = document.createElement("img");
  newImg.href = "./dkoerner_qr.png";
  qrCodeContainer.appendChild(newImg);

  //qrCodeContainer.appendChild(img);

  function togglePortraitQR() {
    if( portraitContainer.style.display == "none" ) {
      // show portrait and hide qr code
      portraitContainer.style.display = "block";
      qrCodeContainer.style.display = "none";
    }else{
      // hide portrait and show qr code
      portraitContainer.style.display = "none";
      qrCodeContainer.style.display = "block";
    }
  }

  if (params.get('qr') !== null) {
    togglePortraitQR();
  }

  // register click handler to toggle between portrait and qr code
  portraitContainer.addEventListener("click", (e) => {
    togglePortraitQR();
    e.stopPropagation();
  });
  qrCodeContainer.addEventListener("click", (e) => {
    togglePortraitQR();
    e.stopPropagation();
  });
});