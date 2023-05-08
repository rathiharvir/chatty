import React from "react";
import axios from "axios";
import { Buffer } from "buffer";
import loader from "assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { setAvatarRoute } from "constants/route.constant";


class SetAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.api = `https://api.multiavatar.com/4645646`;
    this.state = {
      avatars: [],
      isLoading: false,
      selectedAvatar: undefined,
      toastOptions: {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      }
    }
    this.setSelectedAvatar = this.setSelectedAvatar.bind(this);
    this.setProfilePicture = this.setProfilePicture.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    if (this.state.avatars.length === 0) {
      this.fetchData()
    }

  }

  setProfilePicture = async () => {
    if (this.state.selectedAvatar === undefined) {
      toast.error("Please select an avatar", this.state.toastOptions);
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: this.state.avatars[this.state.selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(user)
        );
        this.props.navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", this.state.toastOptions);
      }
    }
  };

  fetchData = async () => {
    this.setState({
      isLoading: true
    }, async () => {
      console.log('Calling')
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${this.api}/${Math.round(Math.random() * 1000)}?apikey=Mdm0T5W9q3YcXz`
        );
        const buffer = new Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      if (data.length > 0) {
        this.setState({
          avatars: data,
          isLoading: false
        })
      }
    })
  }

  setSelectedAvatar = (index) => {
    this.setState({
      selectedAvatar: index
    })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <div>
            <img src={loader} alt="loader" className="loader" />
          </div>
        ) : (
          <>
          <div className="flex flex-col justify-center items-center h-full m-12">
            <div className="flex flex-col justify-center items-center align-center ">
              <h1 className="text-center text-2xl font-bold">Pick an Avatar as your profile picture</h1>
            </div>
            <div className="mt-10 justify-center items-center flex gap-8">
              {this.state.avatars.map((avatar, index) => {
                return (
                  <div className="flex justify-center align-center p-2 rounded-3xl border-solid border-transparent" key={index}>
                    <img
                      className={`h-24 hover:bg-green-500 hover:ring-green-500 hover:shadow-md rounded-md ${this.state.selectedAvatar === index ? 'bg-green-500 ring-green-500 shadow-md' : ''}`}
                      src={`data:image/svg+xml;base64,${avatar}`}
                      alt="avatar"
                      key={avatar}
                      onClick={() => this.setSelectedAvatar(index)}
                    />
                  </div>
                );
              })}
            </div>
            <button onClick={this.setProfilePicture} className="mt-10 flex w-48 justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
              Set as Profile Picture
            </button>
            <ToastContainer />
          </div>
          </>
        )}
      </>
    );
  }
}

function WithProps(props) {
  const navigate = useNavigate();
  return <SetAvatar {...props} navigate={navigate} />;
}

export default WithProps;