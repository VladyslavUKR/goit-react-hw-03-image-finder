import css from './spinner.module.css';

const Spinner = () => {
  return (
    <div className={css.wrapper}>
      <div className={`${css.blue} ${css.ball}`}></div>
      <div className={`${css.red} ${css.ball}`}></div>
      <div className={`${css.green} ${css.ball}`}></div>
      <div className={`${css.yellow} ${css.ball}`}></div>
    </div>
  );
};

export default Spinner;
