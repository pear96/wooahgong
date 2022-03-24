import React from 'react';
import { getYear, getMonth } from 'date-fns'; // getYear, getMonth
import DatePicker, { registerLocale } from 'react-datepicker'; // 한국어적용
import ko from 'date-fns/locale/ko'; // 한국어적용
// import styles from "./RegisterTemplate.module.css";

registerLocale('ko', ko); // 한국어적용

type MyProps = {
  date2: any;
  onChange: (value: any) => void;
};
const _ = require('lodash');

function BirthDate({ date2, onChange }: MyProps) {
  // const [startDate, setStartDate] = useState(new Date());
  //   const d = date;
  const years = _.range(1900, getYear(new Date()) + 1, 1); // 수정
  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <DatePicker
      // showYearPicker

      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            width: '238px',
            // marginLeft : "58px"
          }}
        >
          <button
            type="button"
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            style={{
              width: '50px',
              border: 'none',
            }}
          >
            {'<'}
          </button>
          <select
            style={{
              margin: '0 5px',
            }}
            value={getYear(date)}
            onChange={({ target: { value } }) => {
              const v: number = +value;
              changeYear(v);
            }}
          >
            {years.map((option: any) => (
              <option
                key={option}
                value={option}
                style={{
                  height: '50px',
                  overflow: 'scroll',
                }}
              >
                {option}
              </option>
            ))}
          </select>

          <select
            style={{
              margin: '0 5px',
            }}
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            style={{
              width: '50px',
              border: 'none',
            }}
          >
            {'>'}
          </button>
        </div>
      )}
      selected={date2}
      dateFormat="yyyy-MM-dd"
      locale={ko}
      onChange={(date) => onChange(date)}
    />
  );
}
export default BirthDate;
