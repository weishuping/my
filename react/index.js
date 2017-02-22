const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((number) => number * 2);

Basic List Componet 
function NumberList() {
	const numbers = props.numbers;
	const listItems = numbers.map((number) => <li>{number}</li>);

	return (
		<ul>{listItems}</ul>
	);
}
ReactDOM.render(<NumberList numbers={numbers});