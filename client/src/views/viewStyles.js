
import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";


const viewStyles = makeStyles((theme) => ({
  marginTop1: {
    marginTop: 10,
  },
  badge: {
    marginLeft: "40px"
  },
  mainrow: {
    "&&": {
      padding: theme.spacing(4),
      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(2),
      },
    },
  },
  secondmainrow: {
    "&&": {
      padding: theme.spacing(4),

      marginTop: 30,
      [theme.breakpoints.down("xs")]: {
        marginTop: 75,
        padding: theme.spacing(2),
      },
    },
  },
  deleteicon: {
    "&&": {},
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "100%",
  },
  addUserBtn: {
    color: "#fff",

  },
  backdrop: {
    zIndex: "1101 !important",
    color: "#fff",
  },
  backdropInnerWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  backdropLoadingText: {
    color: "#fff",
    marginTop: "20px !important",
  },
  avtarTd: {
    width: "50px",

  },
  container: {
    maxHeight: 600,
  },
  cancelBtn: {
    "&&": {
      marginLeft: "10px",
    },
  },

  addBtn: {
    "&&": {
      color: "white",

      marginLeft: "10px",
    },
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
    fontSize: "15px",
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
    fontSize: "15px",
  },
  slideRemove: {
    "&&": {
      position: "absolute",
      top: 2,
      right: 2,
    },
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
  featureImgRemove: {
    // position: "absolute",
    // top: "-5px",

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

    display: "flex",
    height: 600,
    "&: .MuiTabs-flexContainerVertical": {
      "&: .MuiButtonBase-root.Mui-selected": {},
    },
    [theme.breakpoints.down("md")]: {
      height: "auto",
    },
  },
  settingsTabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
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
    color: "green",
  },
  mtb2: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 25,
    textTransform: 'capitalize',

  },
  mtb1: {
    marginTop: 10,
    marginBottom: 10,
    minHeight: 25,
    textTransform: 'capitalize',
    textAlign: 'left'
  },
  removefilter: {
    marginLeft: '10px!important',
    marginRight: '10px!important',

  }
  ,
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
    [theme.breakpoints.down("md")]: {
      minWidth: "100% !important",
      width: "100% !important",
      display: "flex !important",
    },
  },
  settingSelectInput: {
    minWidth: "300px !important",
    [theme.breakpoints.down("md")]: {
      minWidth: "100% !important",
      width: "100% !important",
      display: "flex !important",
    },
  },
  marginBottom1: {
    "&&": {
      marginBottom: "10px !important",
    },
  },
  marginTop1: {
    marginTop: "20px !important"
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
    flexDirection: "column",
  },
  themeLogoBoxPreview: {
    maxWidth: "95%",
    maxHeight: "95%",
    marginBottom: 5,
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: '10px',
    marginRight: '10px',
    cursor: 'pointer'
  },

  TableSearchRow: {
    backgroundColor: "white",
    width: "100%",
    padding: "0px",
  },
  searchDiv: {
    display: "flex",
    flexDirection: "row",
    width: "100 %"
  },
  searchOption: {
    marginLeft: "100px",
    padding: "0px!important",
  },
  searchbar: {
    border: "1px solid rgb(199, 191, 191)",
    borderRadius: "25px",
    width: "200px",
  },
  addbtnlink: {
    marginTop: '5px'
  },
  box: {
    width: "250px",
    borderRadius: "25px",
    marginRight: "10px",
    backgroundColor: "white",

  },
  searchWrapper: {
    position: "relative",
    width: "250px",
    padding: '2px',
    borderRadius: "25px",
    backgroundColor: "#f1f1f1",

  },
  searchIcon: {
    position: "absolute",
    left: 0,
    top: "10px",
    marginLeft: "10px",
  },

  textFieldWrapper: {
    padding: '5px',
    paddingLeft: "40px",
    paddingRight: "40px",
    // marginTop: '10px',
    color: 'white',

    border: '0ch'
  },
  insidecardheader: {
    display: 'flex',
    flexDirection: 'row',
  },
  datepicker: {
    width: '107px'
  },
  enddatepicker: {
    width: '105px',
    marginLeft: '10px'
  },
  Datepickerclass: {
    marginLeft: '20px',
    width: '150px'
  },
  Timepickerclass: {
    width: '145px',
    marginTop: '20px'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: '10px'
  },
  muitabs: {
    marginRight: '10px'
  },

  noDataImage: {
    display: 'flex',
    justifyContent: 'center'
  },
  socialmediaSelectIcon: {
    height: '50px',
    mt: 0,
    boxShadow: "none",
    overflow: 'revert!important'
  },
  divContainer: {
    width: "300px",
    height: "50px",
    border: '1px solid black',
    borderRadius: "5px",
    display: 'flex',
    marginTop: '20px',
    lineHeight: '0px',

  },
  iconDiv: {
    width: '20%',
    padding: '5px',


  },
  container: {
    display: 'flex',
  },
  socialMediaIcon: {
    textAlign: 'center',
    objectFit: 'contain',

  },
  iconLogoBox: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    margin: "0px 5px",

    overflow: "hidden",
    objectFit: 'contain',
    border: '1px solid lightgrey'
  },
  iconImage: {
    objectFit: 'contain',
    height: ' 100%',
    width: '100%',
  },
  iconSelect: {
    borderRadius: '5px',
  },
  IconBox: {
    margin: '10px',
    display: 'flex'
  },
  AddIconButton: {
    minWidth: "30px"
  },
  AddIconDiv: {
    marginTop: '25px',
    paddingLeft: '20px',
  },
}));



export default viewStyles;
