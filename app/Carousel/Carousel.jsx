"use client";

import Image from "next/image";
import { Component } from "react";

export default class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  handleThumbnailClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="flex flex-col">
        <img
          height={500}
          width={500}
          className="m-2 rounded-full"
          src={images[active]}
          alt="animal help"
        />
        <div className="flex flex-row">
          {images.map((photo, index) => (
            <img
              onClick={this.handleThumbnailClick}
              className={
                index === active
                  ? "m-2 rounded-full border-4 border-r-gray-200"
                  : "m-2 rounded-full"
              }
              data-index={index}
              height={50}
              width={50}
              key={photo}
              src={photo}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}
