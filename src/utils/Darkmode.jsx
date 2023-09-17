import { useEffect,useState } from 'react'

export const Darkmode = () => {
    const [theme, setTheme] = useState("light-theme");
    const toggleTheme =()=>{
        (theme === "dark-theme")?setTheme("dark-theme"):setTheme("light-theme");
    }

    useEffect(() => {
      document.body.class = theme;
    }, [theme])
    
  return toggleTheme;
}