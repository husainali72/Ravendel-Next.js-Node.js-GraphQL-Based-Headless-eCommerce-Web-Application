import palette from "../theme/palette";
import { makeStyles } from "@material-ui/styles";
import { deepPurple } from "@material-ui/core/colors";

const viewStyles = makeStyles((theme) => ({
  marginTop1: {
    marginTop: 10,
  },
  mainrow: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
  secondmainrow: {
    padding: theme.spacing(4),
    marginTop: 40,
    [theme.breakpoints.down('xs')]: {
      marginTop: 75,
      padding: theme.spacing(2),
    },
  },
  deleteicon: {
    color: palette.error.dark,
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
  },
  addUserBtn: {
    background: palette.success.main,
    color: "#fff",
  },
   backdrop: {
    zIndex: "1101 !important",
    color: "#fff",
  },
  backdropInnerWrapper:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  backdropLoadingText:{
    color: '#fff',
    marginTop: '20px !important'
  },
  avtarTd: {
    width: "50px",
  },
  container: {
    maxHeight: 600,
  },
  cancelBtn: {
    background: palette.error.dark,
    color: "#fff",
    marginLeft: theme.spacing(2),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  width100: {
    width: "100%",
  },
  formbottom: {
    marginTop: theme.spacing(3),
  },
  secondRow: {
    marginTop: theme.spacing(3),
  },
  marginBottom: {
    marginBottom: "24px !important",
  },
  feautedImage: {
    color: "#0073aa",
    textDecoration: "underline",
    display: "flex",
    cursor: "pointer",
  },
  feautedImageBox: {
    background: "rgb(240,240,240)",
    height: "250px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
  },
  feautedImageBoxPreview: {
    maxWidth: "90%",
    maxHeight: "90%",
  },
  variantImage: {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
    border: "1px solid #545454",
  },
  sliderImageWrapper: {
    background: "#f7f7f7",
    minHeight: "225px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    flexDirection: "column",
    position: "relative",
    border: ".5px solid #ddd",
    padding: 10,
  },
  sliderImagePreviewWrapper: {
    height: "100px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  slidesInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  sliderImagePreview: {
    maxWidth: "90%",
    maxHeight: "90%",
  },
  slideRemove: {
    position: "absolute",
    top: 2,
    right: 2,
  },
  galleryImgOuterBox: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    marginBottom: 5,
  },
  galleryImgBox: {
    margin: 5,
    width: 60,
    height: 60,
    position: "relative",
    background: "#ddd",
    padding: 5,
  },
  galleryImgRemove: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "#d80e0e",
    borderRadius: "100%",
    color: "#fff",
    width: 20,
    height: 20,
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
  },
  galleryImg: { width: "100%", height: "100%" },
  editpermalinkInput: {
    padding: "5px !important",
    height: "25px",
    marginLeft: 10,
  },
  editpermalinkInputBtn: {
    height: "25px",
    fontSize: "10px",
    padding: 0,
    marginLeft: 10,
  },
  taxSelect: {
    width: 300,
    marginTop: 20,
  },
  infopopover: {
    pointerEvents: "none",
  },
  infopopoverpaper: {
    padding: theme.spacing(1),
  },
  infopopoverhelp: {
    cursor: "pointer",
  },
  floatRight: {
    float: "right",
  },
  flex1: {
    flex: 1,
  },
  pl2: {
    paddingLeft: theme.spacing(2),
  },
  logoImageBox: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    margin: "0px 10px",
    overflow: "hidden",
    border: "2px solid #ddd",
  },
  logoImagePreview: {
    width: "100%",
    height: "100%",
  },
  selectCatLabel: {
    position: "absolute",
    top: "-9px",
    background: "#fff",
    padding: "0 5px",
    left: "7px",
    zIndex: 1,
    fontSize: 12,
  },
  settingRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 600,
    "&: .MuiTabs-flexContainerVertical": {
      "&: .MuiButtonBase-root.Mui-selected": {
        backgroundColor: "#000",
      },
    },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  settingsTabs: {
    //borderRight: `1px solid ${theme.palette.divider}`\
  },
  flexGrow1: {
    flexGrow: 1,
  },
  tabsHeader: { background: "#eee" },
  tabsBody: {
    border: ".5px solid #cacaca",
    borderTop: "none",
    backgroundColor: "#fbfbfb",
  },
  upperCard: {
    minHeight: 240,
  },
  downCard: {
    minHeight: 310,
  },
  purple: {
    backgroundColor: deepPurple[500],
  },
  statusSelect: {
    marginTop: 25,
    width: 300,
  },
  fullWidth: {
    width: "100%",
  },
  dBlock: {
    display: "block",
  },
  textRight: {
    textAlign: "right",
  },
  discount: {
    color: "red",
  },
  mtb2: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 25,
  },
  radioRoot: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  radioIcon: {
    borderRadius: "50%",
    width: 16,
    height: 16,
    boxShadow:
      "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    backgroundColor: "#f5f8fa",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))",
    "$root.Mui-focusVisible &": {
      outline: "2px auto rgba(19,124,189,.6)",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      backgroundColor: "#ebf1f5",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background: "rgba(206,217,224,.5)",
    },
  },
  radiocheckedIcon: {
    backgroundColor: "#137cbd",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 16,
      height: 16,
      backgroundImage: "radial-gradient(#fff,#fff 28%,transparent 32%)",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#106ba3",
    },
  },
  settingLeft: {
    maxHeight: "600px",
    background: "#ececec",
  },
  settingRight: {
    maxHeight: "600px",
    background: "#fdfdfd",
    border: ".5px solid #eee",
  },
  taxTabsWrapper: {
    background: "#fafafa",
    border: ".5px solid #eee",
  },
  noteline: {
    background: "lightyellow",
    fontSize: 14,
    padding: 5,
  },
  cstmSelect: {
    width: "280px !important",
    marginTop: "20px !important",
  },
  customFieldRow: {
    width: "100%",
    marginTop: "20px !important",
    marginBottom: "20px !important",
  },
  customFieldInput: {
    minWidth: "400px !important",
    marginRight: "10px !important",
  },
  settingInput: {
    minWidth: "300px !important",
    marginBottom: "25px !important",
    [theme.breakpoints.down('md')]: {
      minWidth: "100% !important",
      width: "100% !important",
      display: "flex !important"
    },
  },
  settingSelectInput: {
    minWidth: "300px !important",
    [theme.breakpoints.down('md')]: {
      minWidth: "100% !important",
      width: "100% !important",
      display: "flex !important"
    },
  },
  marginBottom1: {
    marginBottom: "10px !important",
  },
  marginBottom2: {
    marginBottom: "20px !important",
  },
  marginBottom3: {
    marginBottom: "30px !important",
  },
  marginRight1: {
    marginRight: "10px !important",
  },
  marginRight2: {
    marginRight: "20px !important",
  },
  marginRight3: {
    marginRight: "30px !important",
  },
  paddingBottom1: {
    paddingBottom: "10px !important",
  },
  paddingBottom2: {
    paddingBottom: "20px !important",
  },
  paddingBottom3: {
    marginBottom: "30px !important",
  },
  themeLogoWrapper: {
    background: "rgb(240,240,240)",
    width: "250px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    flexDirection: 'column'
  },
  themeLogoBoxPreview: {
    maxWidth: "95%",
    maxHeight: "95%",
    marginBottom: 5
  },
}));

export default viewStyles;
