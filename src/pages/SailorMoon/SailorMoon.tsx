import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import SailorA from "assets/Sailor Moon 1.png";
import SailorB from "assets/Sailor Moon 2.png";
import SailorC from "assets/Sailor Moon 3.png";
import SailorD from "assets/Sailor Moon 4.png";
import HarleyQuinn1 from "../../assets/HarleyQuinn/img1.png";
import HarleyQuinn2 from "../../assets/HarleyQuinn/img2.png";
import HarleyQuinn3 from "../../assets/HarleyQuinn/img3.png";
import HarleyQuinn4 from "../../assets/HarleyQuinn/img4.png";
import HarleyQuinn5 from "../../assets/HarleyQuinn/img5.png";
import HarleyQuinn6 from "../../assets/HarleyQuinn/img6.png";
import HarleyQuinn7 from "../../assets/HarleyQuinn/img7.png";
import HarleyQuinn8 from "../../assets/HarleyQuinn/img8.png";
import MusicDropZone from "components/atoms/MusicDropZone";
import ImageService from "services/image.service";
import AuthService from "services/auth.service";
import { backgroundActions } from "redux/slices/background";

export default function SailorMoon() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const visitedUser = useAppSelector((state) => state.user.user);
  const { music, outfit, anime, bgType } = useAppSelector(
    (state) => state.background
  );
  const [anim, setAnim] = useState(anime);
  const [image, setImage] = useState(true);
  const [characterIndex, setCharacterIndex] = useState(0);
  const [characterImageIndex, setCharacterImageIndex] = useState(0);
  const characters = [
    { label: "Sailor Moon", images: [SailorA, SailorC] },
    {
      label: "Harley Quinn",
      images: [
        HarleyQuinn1,
        HarleyQuinn2,
        HarleyQuinn3,
        HarleyQuinn4,
        HarleyQuinn5,
        HarleyQuinn6,
        HarleyQuinn7,
        HarleyQuinn8,
      ],
    },
  ];
  const audioRef = useRef<any>();
  let sailorPlay = useRef<any>(null);

  // useEffect(() => {
  //   setAnim(anime);
  // }, [anime]);

  // useEffect(() => {
  //   setImage(outfit);
  // }, [outfit]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play();
    }
  }, [user, music, visitedUser, bgType]);

  useEffect(() => {
    ImageService.getBgMusic(dispatch);
  }, []);

  const outfitChange = () => {
    setImage(!image);

    if (user) AuthService.outfit(image, dispatch);
    else ImageService.outfit(image, dispatch);
  };
  const handleCharLabel = (index: any) => {
    setCharacterImageIndex(0);
    if (characters.length === index + 1) {
      setCharacterIndex(0);
    } else {
      setCharacterIndex(index + 1);
    }
  };

  const handleCharImages = (index: any) => {
    if (characters[characterIndex].images.length === index + 1) {
      setCharacterImageIndex(0);
    } else {
      setCharacterImageIndex(index + 1);
    }
  };
  console.log(characterIndex,characterImageIndex)
  console.log(characters[characterIndex]?.images[characterImageIndex],"fg");
  return (
    <div className="sailor-img">
      <h3
        style={{ fontFamily: "'Varela Round', sans-serif", fontSize: "16px" }}
        onClick={() => {
          handleCharLabel(characterIndex);
        }}
      >
        {characters[characterIndex]?.label}
      </h3>
      {
        <img
          alt="Sailor A"
          src={characters[characterIndex].images[characterImageIndex]}
          onClick={() => handleCharImages(characterImageIndex)}
        />
      }
      {/* {music || user?.music ? (
        anim ? (
          <img
            alt="Sailor Music B"
            src={image ? SailorB : SailorD}
            onClick={() => outfitChange()}
          />
        ) : (
          <img
            alt="Sailor Music A"
            src={image ? SailorA : SailorC}
            onClick={() => outfitChange()}
          />
        )
      ) : (
        <img
          alt="Sailor A"
          src={characters[characterIndex].images[characterImageIndex]}
          onClick={() => handleCharImages(characterImageIndex)}
        />
      )} */}
      <audio
        controls
        autoPlay
        loop
        ref={audioRef}
        onPlay={() => {
          sailorPlay.current = setInterval(function () {
            setAnim((prev) => !prev);
          }, 300);
        }}
        onPause={() => {
          if (sailorPlay.current) clearInterval(sailorPlay.current);
        }}
      >
        <source
          src={
            visitedUser
              ? `${process.env.REACT_APP_FILE_URL}/${
                  bgType === "private" ? visitedUser?.music : music
                }`
              : user
              ? `${process.env.REACT_APP_FILE_URL}/${
                  bgType === "private" ? user?.music : music
                }`
              : `${process.env.REACT_APP_FILE_URL}/${music}`
          }
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>
      <br />
      <>
        <button
          onClick={() => dispatch(backgroundActions.setBgType("public"))}
          style={{
            cursor: "pointer",
            border: 0,
            fontFamily: "'Varela Round', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            background: "none",
            color: "white",
            padding: 0,
            marginBottom: "0.83em",
          }}
        >
          Public
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            if (visitedUser || user)
              dispatch(backgroundActions.setBgType("private"));
          }}
          style={{
            cursor: "pointer",
            border: 0,
            fontFamily: "'Varela Round', sans-serif",
            fontWeight: 500,
            fontSize: "16px",
            background: "none",
            color: visitedUser || user ? "white" : "black",
            padding: 0,
            marginBottom: "0.83em",
          }}
        >
          Private
        </button>
      </>
      <div className="music-upload-box">
        <MusicDropZone musicType={bgType} />
      </div>
    </div>
  );
}
