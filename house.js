AFRAME.registerComponent("house", {
    schema: {
        state: { type: "string", default: "places-list" },
        selectedCard: { type: "string", default: "#card1" },
        zoomAspectRatio: { type: "number", default: 1 },
    },
    init:function() {
        this.placesContainer = this.el;
        this.createCards()
    },

    update: function() {
        window.addEventListener("keydown", e => {
          if (e.key === "ArrowUp") {
            if (
              (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
              (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio += 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
          if (e.key === "ArrowDown") {
            if (
              (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
              (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
            ) {
              this.data.zoomAspectRatio -= 0.002;
              this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
            }
          }
        });
      },

      tick: function() {
        const { state } = this.el.getAttribute("house");
    
        if (state === "view") {
          this.hideEl([this.placesContainer]);
          this.showView();
        }
      },
      hideEl: function(elList) {
        elList.map(el => {
          el.setAttribute("visible", false);
        });
      },
      showView: function() {
        const { selectedCard } = this.data;
        const skyEl = document.querySelector("#main-sky");
        skyEl.setAttribute("material", {
          src: `./assets/images/${selectedCard}/living room.jpg`,
          color: "#fff"
        });
      },

    createCards: function() {

        const thumbNailsRef = [
            {
                id: "house1",
                title: "HOUSE NO.1",
                url: "./assets/thumb/house1.jpg"
            },
            {
                id: "house2",
                title: "HOUSE NO.2",
                url: "./assets/thumb/house2.jpg"
            }
        ]

        let previousXposition = -66;
        for(var item of thumbNailsRef){
            const posX = previousXposition + 26;
            const posY = 10;
            const posZ = -20;
            const position = { x: posX, y: posY, z: posZ}
            previousXposition = posX;

            const borderEl = this.createBorder(position, item.id);
            this.placesContainer.appendChild(borderEl);

            const thumbNail = this.createThumbnails(item);
            borderEl.appendChild(thumbNail);

            const titleEl = this.createTitleEl(position, item);
            borderEl.appendChild(titleEl);
        }
    },

    createThumbnails: function(item) {
        const thumb = document.createElement("a-entity")
        thumb.setAttribute("visible", true)
        thumb.setAttribute("geometry", {
            primitive: "circle",
            radius: 9,
        })
        thumb.setAttribute("material", {src: item.url})

        return thumb
    },

    createBorder: function(position, id) {
        const entityEl = document.createElement("a-entity")
        entityEl.setAttribute("id", id)
        entityEl.setAttribute("position", position)
        entityEl.setAttribute("visible", true)
        entityEl.setAttribute("geometry", {
            primitive:"ring",
            radiusInner:9,
            radiusOuter:10,
        });
        entityEl.setAttribute("material", {
            color:"cyan",
            opacity:1,
        });
        entityEl.setAttribute("cursor-listener", {})
        return entityEl
    },


    createTitleEl: function(position, item) {
        const titleEl = document.createElement("a-entity");

        titleEl.setAttribute("text", {
            font: "exo2bold",
            align: "center",
            width: 60,
            color: "#e65100",
            value: item.title,
        })

        const elPosition = position;
        elPosition.y = -20;
        elPosition.x = -13
        titleEl.setAttribute("position", elPosition);
        titleEl.setAttribute("visible", true);

        return titleEl
    }

})