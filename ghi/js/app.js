function createCard(name, description, pictureUrl, newStartDate, newEndDate, locationName) {
    return `
    <div class="col">
        <div class="card shadow p-3 mb-5 bg-body rounded">
            <img src="${pictureUrl}" class="card-img-top">
                <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
                <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                <small class="text-muted">${newStartDate}-${newEndDate}</small>
                </div>
        </div>
    </div>
    `;
}
var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Nice, you triggered this alert message!', 'success')
  })
}
// window.addEventListener('DOMContentLoaded', async () => {
//     const url = 'http://localhost:8000/api/conferences/';

//     try {
//       const response = await fetch(url);
  
//       if (!response.ok) {
//     //     // Figure out what to do when the response is bad
//     //     throw new Error('Response not ok')
//       } else {
//         const data = await response.json();

        // for (let conference of data.conferences) {
        //     const detailUrl = `http://localhost:8000${conference.href}`;
        //     const detailResponse = await fetch(detailUrl);
        //     if (detailResponse.ok) {
        //     const details = await detailResponse.json();
        //     const name = details.conference.name;
        //     const description = details.conference.description;
        //     const pictureUrl = details.conference.location.picture_url;
        //     const html = createCard(name, description, pictureUrl);
        //     const column = document.querySelector('.col');
        //     column.innerHTML += html;
        //     }
        // }

//       }
//     } catch (e) {
//       // Figure out what to do if an error is raised
//     //   error => console.error('error', error)
//     }
// });

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';
  
    try {
      const response = await fetch(url);
  
      if (!response.ok) {
        // Figure out what to do when the response is bad
        throw new Error('Response not ok')
      } else {
        
        const data = await response.json();
  
        for (let conference of data.conferences) {
          const detailUrl = `http://localhost:8000${conference.href}`;
          const detailResponse = await fetch(detailUrl);
          if (detailResponse.ok) {
            const details = await detailResponse.json();
            const name = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            let startDate = details.conference.starts;
                let d1 = new Date(startDate)
                let newStartDate = (d1.getMonth()+1) + "/" + d1.getDate() + "/" + d1.getFullYear()
            let endDate = details.conference.ends;
                let e1 = new Date(endDate)
                let newEndDate = (e1.getMonth()+1) + "/" + e1.getDate() + "/" + e1.getFullYear()
            let locationName = details.conference.location.name;
            const html = createCard(name, description, pictureUrl, newStartDate, newEndDate, locationName);
            const column = document.querySelector('.row');
            column.innerHTML += html;
          }
        }
  
      }
    } catch (e) {
      // Figure out what to do if an error is raised
      error => console.error('error', error)
    }
  
});
