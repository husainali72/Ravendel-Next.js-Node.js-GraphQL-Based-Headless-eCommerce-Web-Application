/* eslint-disable react/prop-types */
import { get } from 'lodash';
import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
const ThemeContext = createContext();
const defaultTheme = createTheme( {
  palette: {
    primary: {
      main: '#088178',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
  },
} );

export const AlternativeThemeProvider = ( { children } ) => {
  const [ theme, setTheme ] = useState( defaultTheme );
  const settings = useSelector( ( state ) => state.setting );
  useEffect( () => {
    const settingTheme = get( settings, 'setting.appearance.theme' );
    let primaryColor=get( settingTheme, 'primary_color', '#088178' )
    let themeColors = createTheme( {
      palette: {
        primary: {
          main: primaryColor|| '#088178' ,
        },
        secondary: {
          main: '#FFFFFF',
        },
        error: {
          main: red.A400,
        },
      },
    } );

    document.documentElement.style.setProperty(
      '--primary-color',
      themeColors.palette.primary.main
    );
    document.documentElement.style.setProperty(
      '--secondary-color',
      themeColors.palette.secondary.main
    );
    setTheme( { ...themeColors } );
  }, [ settings ] );

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext( ThemeContext );
};
