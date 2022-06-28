import NumberFormat from 'react-number-format';
interface Props {
  number: number;
  type: string;
}
const IncomePrice: React.FC<Props> = ({ number,type }) => {
  return (
    <>
      <NumberFormat
        value={number}
        className={type}
        displayType={'text'}
        thousandSeparator={true}
        suffix="VNĐ"
      />
    </>
  )
}

export default IncomePrice