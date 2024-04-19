const imgContainer = document.querySelector(".img-container");

      const count = 10;
      const apikey = "_DDIVJSgdK-GI1wA3aHOtxC9YTt8tCY6-4jMk7guznY";
      const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;

      const imageArr = [];
      let scrolled = false;
     
      function getImage() {
        const imagePromise = new Promise((res, rej) => {
          res(fetch(apiUrl));
          rej((err) => {
            console.log(err);
          });
        });
        
        imagePromise
          .then((Response) => {
            console.log("check promise");
            return Response.json();
          })
          .then((data) => {
            console.log(data);
            data.forEach(ImgObjs=>{
              console.log(ImgObjs.urls.regular)
              imageArr.push(ImgObjs.urls.regular)
            })
            SetImages(imageArr)
          })
          .catch();
      }

      getImage();

      const SetImages = function (data) {
        // debugger
        const div = document.createElement("div");
        imageArr.forEach((image) => {
          const img = document.createElement("img");
          img.setAttribute("src", image);
          div.appendChild(img);
          console.log(img);
        });
        imgContainer.appendChild(div);
        scrolled = false;
      };

      window.addEventListener("scroll",()=>{
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight){
          if(scrolled) return;
          getImage()
          scrolled = true;
        }
      })
  
  