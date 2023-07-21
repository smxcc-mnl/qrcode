let scanner = new Instascan.Scanner({
  video: document.getElementById('preview'),
  mirror: false,
});

const video = document.querySelector('video');

scanner.addListener('scan', function (content) {
  console.log(content);

  Swal.fire({
    title: 'SMXCC MNL QR Code Scanner',
    html: content.includes('http')
      ? /* html */ `<a href="${content}" target="_blank">${content}</a>`
      : content,
    icon: 'success',
    confirmButtonText: 'Oke',
    timer: 3000,
  });
});

document.querySelector('button').addEventListener('click', function () {
  const isAktif = this.dataset.isAktif;

  if (isAktif == 'off') {
    this.innerText = 'Turn Off Camera';
    this.dataset.isAktif = 'on';

    Instascan.Camera.getCameras()
      .then(function (cameras) {
        if (cameras.length > 0) {
          video.classList.remove('none');
          video.classList.add('block');

          var selectedCam = cameras[0];
          cameras.forEach(c => {
            if (c.name.indexOf('back') != -1) {
              selectedCam = c;
              return false;
            }
          });

          scanner.start(selectedCam);
        } else {
          console.error('No cameras found.');
        }
      })
      .catch(function (e) {
        console.error(e);
      });
  } else {
    this.innerText = 'Turn On Camera';
    this.dataset.isAktif = 'off';

    video.classList.remove('block');
    video.classList.add('none');

    scanner.stop();
  }
  console.log(this.dataset.isAktif);
});
