import { useState , useEffect} from 'react'
import './filters.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { ScreenWidthUpdater } from '../../utils/ScreenWidthUpdater';
import Slider from '../Slider/Slider'

const Filters = () => {
  const [filter, setFilter] = useState(false);

  const toggleFilter =()=>{
    setFilter(!filter);
  }

  const {screenWidth, updateScreenWidth} = ScreenWidthUpdater();

  useEffect(() => {
    updateScreenWidth
  }, [screenWidth])

  return (
    <div className="filters">
      <div className="filter-head">
        <div className="filters-title">Filters</div>
        {
          (filter)?
          <ArrowDropUpIcon className='arrow-icon'  onClick={toggleFilter} />
          :
        <ArrowDropDownIcon className='arrow-icon' onClick={toggleFilter} />
        }
      </div>
      {
       ( screenWidth<600?filter:!filter)?
        <div className="filter-body">
          <div className="slider1-name">Price</div>
          <div className="slider1"><Slider/></div>
        </div>
        :<></>
      }
    </div>
  )
}

export default Filters;