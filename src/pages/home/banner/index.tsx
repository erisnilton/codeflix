import { makeStyles } from "@material-ui/core";
import { useMemo, useState } from "react";
import Slider, { SliderProps } from "../../../components/slider/Slider";
import { SliderArrow } from "../../../components/slider/SliderArrow";
import VideoContent from "../../../components/video/VideoContent";
import VideoThumbnail from "../../../components/video/VideoThumbnail";
import useIsSmallWindows from "../../../hooks/useIsSmallWindows";
import banner from "../../../static/img/1-vid-banner-01.jpg";
import bannerHalf from "../../../static/img/1-vid-banner-half-01.jpg";
import Rating from "./Rating";
import SliderStepper from "./VideoActions/SliderStepper";
import VideoActionsMobile from "./VideoActions/VideoActionsMobile";

const useStyles = makeStyles((theme) => ({
  divSliderRoor: {   
    [theme.breakpoints.down(400)]: {
      height: "180px"
  },
    [theme.breakpoints.between(400, 700)]: {
        height: "180px"
    }
  },
  rootImage: {
    position: "relative",
    "&:focus": {
      outlineColor: theme.palette.text.primary,
    },
  },
  image: {
    [theme.breakpoints.down(400)]: {
      width: "300px",
      height: "169px",
    },

    [theme.breakpoints.up(400)]: {
      width: "350px",
      height: "197px",
    },

    [theme.breakpoints.up(700)]: {
      width: "650px",
      height: "366px",
    },

    [theme.breakpoints.up(1200)]: {
      width: "1150px",
      height: "647px",
    },
  },
  get slider() {
   
    

    console.log(Object.fromEntries(
      Object.entries(this.image).map((size) => [
        size[0],
        {
          "& .slick-list & .slick-track": {
            height: size[1].height,
          },
        },
      ])
    ))
    return Object.fromEntries(
      Object.entries(this.image).map((size) => [
        size[0],
        {
          "& .slick-list & .slick-track": {
            height: size[1].height,
          },
        },
      ])
    );
  },
}));
const Banner: React.FunctionComponent = () => {
  const classes = useStyles();
  const classesSlider = classes.slider;
  const isSmallWindows = useIsSmallWindows();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderProps: SliderProps = useMemo(
    () => ({
      className: classesSlider,
      dots: false,
      centerMode: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      variableWidth: true,
      arrows: !isSmallWindows,
      prevArrow: <SliderArrow dir="left" />,
      nextArrow: <SliderArrow dir="right" />,
      beforeChange: (oldIndex, nextIndex) => {
        setActiveIndex(nextIndex);
      },
    }),
    [isSmallWindows, classesSlider]
  );
  const thumbnails = isSmallWindows ? banner : bannerHalf;

  return (
    <>
      <div className={classes.divSliderRoor}>
      <Slider {...sliderProps}>
        {Array.from(new Array(6).keys())
          .map(() => thumbnails)
          .map((v, index) => {
            const show = index === activeIndex;
            return (
              <div>
                <VideoThumbnail
                  key={v}
                  classes={{ root: classes.rootImage, image: classes.image }}
                  ImgProp={{ src: thumbnails }}
                >
                  {show && (
                    <VideoContent
                      video={{
                        id: "000",
                        title: "Epitafios",
                        categories: [
                          { id: "111", name: "Documentários", is_active: true },
                        ],
                      }}
                    />
                  )}
                  {show && <Rating rating="14" />}
                </VideoThumbnail>
              </div>
            );
          })}
      </Slider>
      </div>
      {!isSmallWindows && <SliderStepper maxSteps={6} activeStep={activeIndex} />}
       <VideoActionsMobile />
    </>
  );
};

export default Banner;
