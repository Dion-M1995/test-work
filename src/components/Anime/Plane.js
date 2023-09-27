import React, { useState, useEffect } from 'react';

const Plane = ({ size }) => {
	const [airplanePosition, setAirplanePosition] = useState({ x: 0, y: 0, rotation: 0, scaleY: 1 });
	const [direction, setDirection] = useState(1);
	useEffect(() => {
		const interval = setInterval(() => {
			setAirplanePosition(prevPosition => {
				const newX = prevPosition.x + direction;
				let rotation = prevPosition.rotation;
				let newScaleY = prevPosition.scaleY;
				if (newX >= size() - 250 || newX < 0) {
					setDirection(-direction);
					rotation += 180;
					newScaleY = -newScaleY;
				}

				const newY = 50 * Math.sin((newX - 50) * 0.03) + 50;

				return { x: newX, y: newY, rotation, scaleY: newScaleY };
			});
		}, 10);

		return () => {
			clearInterval(interval);
		};
	}, [direction]);

	return (
		<svg
			className='plane'
			width='150px'
			height='100px'
			viewBox='0 0 219 96'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			style={{
				transform: `translate(${airplanePosition.x}px, ${
					direction === -1 ? airplanePosition.y + 200 : airplanePosition.y
				}px) rotate(${airplanePosition.rotation}deg) scaleY(${airplanePosition.scaleY})`,
				transition: 'transform 0.1s linear',
			}}
		>
			<path
				d='M65.7137 85.954L32.6429 94.0122L12.2852 76.024L19.4842 72.8828L43.4807 82.1216L89.9488 64.1789L67.4505 54.773L53.5545 50.8897L63.3892 47.1791L102.051 50.8897L102.918 46.7241L104.365 43.5393L120.759 36.08L128.592 33.902L138.6 36.08L142.081 38.4756L176.24 30.6352L181.679 32.3775L192.122 50.8897L166.667 60.0369L65.7137 85.954Z'
				fill='#232323'
			></path>
			<path
				d='M155.737 53.7836L127.85 49.8666L155.73 41.7585L161.196 46.3583L155.737 53.7836Z'
				fill='white'
			></path>
			<path d='M27.1768 89.9534V89.9746L27.2192 89.9534H27.1768Z' fill='white'></path>
			<path
				d='M192.567 43.4031C189.235 38.1257 186.791 33.6157 185.917 32.5342C183.37 29.4146 179.577 29.5841 176.321 29.9927C167.64 31.0741 164.253 32.1804 148.95 35.1256C146.698 35.5741 142.451 36.4761 140.11 35.8881C133.908 34.3532 132.035 33.1223 129.061 33.3665C124.456 33.7502 114.99 36.9695 104.712 42.4064C101.497 44.0809 101.869 46.0842 101.305 47.4048C101.188 47.6939 101.449 47.9729 101.855 48.0078C103.349 48.1175 119.658 49.144 120.401 49.2188C120.153 49.1241 120.029 48.9597 120.029 48.7803C120.029 48.6208 120.133 48.4613 120.367 48.3816C125.02 46.5676 141.928 40.0842 152.137 37.1688C166.105 33.1572 169.478 32.7286 173.719 32.4396C174.71 32.3748 176.1 32.4196 177.112 32.4695C177.939 32.5143 178.654 32.8781 178.916 33.4313C180.844 37.5276 186.495 46.7819 189.476 49.8467C189.476 49.8467 188.946 50.5743 187.948 50.6092C187.163 50.6191 185.566 49.5477 184.575 48.9148C184.354 48.7852 184.045 48.7653 183.79 48.8799C167.041 56.3551 154.966 59.6142 153.225 60.0628C153.08 60.0976 152.929 60.0976 152.784 60.0528L144.227 57.7455C144.227 57.7455 144.551 57.5511 145.349 56.3949C145.514 56.1258 145.604 55.8169 145.59 55.6225C145.528 54.6358 144.213 54.4115 143.621 54.3567C141.343 54.1524 80.205 47.6241 64.8741 46.5327C58.3686 46.0593 52.1798 48.4713 49.5019 50.9929L49.5157 51.0577L58.1965 57.6059C58.3893 57.7554 58.6853 57.7903 58.9331 57.7106L65.7622 55.4331C65.7622 55.4331 66.6984 57.5262 65.8241 57.88C60.1516 60.1325 54.6581 62.1458 49.3436 64.1641C47.2095 64.9814 47.2577 66.5263 46.5624 68.699C46.2733 69.606 46.1218 70.4383 46.1218 70.4383C46.1218 70.4383 58.0313 66.1176 65.3285 63.596C65.5832 63.5113 65.8654 63.5512 66.0719 63.7007C67.1114 64.513 67.4556 64.6973 68.1647 65.2106C68.4745 65.4449 68.3988 65.8087 68.0133 65.9532C66.2922 66.616 64.5161 67.2937 63.1531 67.8818C62.0723 68.3452 63.1737 69.905 63.1737 69.905L82.993 63.1076C82.993 63.1076 84.2253 63.9897 82.043 64.9714C78.6629 66.5063 47.4023 78.043 44.7175 78.0928C37.6269 78.2224 24.2511 68.5645 19.4184 67.0944C15.343 65.8535 10.951 67.8768 4.99623 70.4084C3.37847 71.106 4.3629 72.7904 4.3629 72.7904L12.9956 69.626C12.9956 69.626 14.0626 70.518 12.8648 71.0612C8.68611 72.9798 2.64188 74.8984 1.71252 75.3818C0.349472 76.0895 0.872663 79.4035 0.872663 79.4035L9.0372 76.6626C9.28503 76.5779 9.58793 76.6078 9.70496 76.6925L27.2043 88.7524C28.2232 88.568 29.1732 88.3637 30.4467 87.96L15.8456 76.7224C15.5496 76.4882 15.639 76.1194 16.0246 75.9798C17.5184 75.4317 19.3014 75.028 21.8279 76.4284C23.9482 77.5945 31.3692 81.94 38.5493 81.4766C40.945 81.3271 40.9794 81.8603 40.9794 81.8603C40.9794 81.8603 37.9298 82.9218 34.3156 84.357C32.5257 85.0746 33.9783 86.9633 33.9783 86.9633C52.4758 81.4716 75.2553 74.6343 78.4495 73.6376C78.6836 73.5728 78.9108 73.6027 79.1035 73.7024L84.4525 76.7772C85.2097 77.6343 123.258 67.0445 134.989 62.7538C135.643 62.5196 141.611 62.7189 144.496 62.699C145.817 62.699 145.769 63.1176 145.769 63.1176C145.769 63.1176 50.5414 90.5963 27.1837 89.9634L27.1424 89.9833L22.1652 91.5282C25.084 92.9235 24.3887 95.3355 29.3591 93.4717C29.6551 93.9651 29.9993 94.4883 30.3641 95.0465C31.0066 96.0598 33.4344 96.0498 37.6475 95.0166C55.5117 90.6411 135.87 73.2539 153.865 67.8618C164.026 64.8269 178.076 60.6358 186.833 56.7089C195.479 52.8467 197.242 50.8534 192.547 43.4131L192.567 43.4031ZM115.693 43.6722C114.612 44.2304 107.494 43.2686 107.494 43.2686C107.494 43.2686 115.369 38.2004 122.866 37.5526C125.096 37.3582 129.605 38.624 129.605 38.624C129.605 38.624 119.554 41.6589 115.699 43.6722H115.693ZM139.58 38.6439L129.447 42.4064C129.447 42.4064 127.093 41.3749 129.743 40.5077C130.424 40.2835 131.98 39.6406 133.24 39.1672C133.935 38.9081 133.88 38.1705 133.151 37.9562L125.612 35.7685C126.886 35.0309 128.869 34.5974 130.755 35.006C131.849 35.2502 136.427 36.6456 139.436 37.5575C140.365 37.8366 140.145 38.4446 139.58 38.6489V38.6439ZM142.114 56.4498C141.122 57.5112 138.809 59.4847 135.409 59.086C133.749 58.8817 66.2303 48.9646 66.0651 48.9547C65.5901 48.86 65.652 48.1274 66.5125 48.2022L141.659 55.7072C142.134 55.762 142.396 56.1557 142.107 56.4498H142.114Z'
				fill='white'
			></path>
			<g className='propeller'>
				<g>
					<path
						id='propeller--center-empty'
						d='M190.915 34.129C190.853 34.139 190.77 34.1489 190.708 34.1639C190.647 34.1838 190.578 34.2087 190.529 34.2486L191.225 34.119C191.108 34.119 191.018 34.129 190.915 34.129Z'
						fill='yellow'
					></path>
					<path
						id='propeller--bottom'
						d='M218.665 70.8917C218.1 69.2522 213.956 58.3883 211.567 54.4015L200.656 40.2286C199.616 41.2453 198.391 42.3317 197.221 43.124C197.001 43.2536 196.773 43.3682 196.498 43.4579C196.161 43.5626 195.83 43.6174 195.493 43.6273L201.372 57.6059C202.246 59.8484 204.291 61.7571 206.053 63.6956C206.941 64.6525 213.192 71.405 215.594 73.9964C216.097 74.5346 217.212 74.5546 217.701 74.0064C218.575 73.0396 219.002 71.8635 218.651 70.8967L218.665 70.8917ZM216.531 72.8303L216.4 72.9798L216.255 72.8303C216.166 72.7356 207.34 63.3319 204.153 59.689C203.189 58.5926 204.318 58.0394 204.318 58.0394L204.449 57.9846L204.539 58.0693C204.986 58.478 215.395 68.2954 216.744 70.0994C217.77 71.4499 216.579 72.7705 216.524 72.8303H216.531Z'
						fill='white'
					></path>
					<path
						id='propeller--top'
						d='M189.71 18.3763C188.512 15.4411 186.468 13.5424 184.692 11.5988C183.804 10.6221 177.305 3.61038 175.02 1.14357C174.593 0.680115 173.643 0.685099 173.216 1.15354C172.28 2.17016 171.867 3.44592 172.225 4.46753C172.803 6.09711 176.803 16.9062 179.198 20.8929L189.153 33.5858C189.4 33.3914 189.703 33.222 190.054 33.1123C190.295 33.0376 190.557 32.9927 190.798 32.9828C192.113 32.918 194.171 32.9279 196.03 32.9529L189.703 18.3813L189.71 18.3763ZM186.495 17.3995L186.365 17.4544L186.275 17.3696C185.835 16.951 175.446 7.14363 174.07 5.32966C173.065 3.96918 174.249 2.65854 174.304 2.60372L174.434 2.46419L174.579 2.60372C174.669 2.70837 183.508 12.1221 186.681 15.75C187.645 16.8514 186.516 17.3896 186.502 17.3995H186.495Z'
						fill='white'
					></path>
					<path
						id='propeller--center'
						d='M202.06 34.129C199.348 33.6905 194.213 33.6656 191.142 33.8051C191.011 33.8051 190.922 33.8051 190.805 33.8151C190.743 33.8251 190.66 33.835 190.585 33.85C190.523 33.8699 190.454 33.8948 190.392 33.9447C190.048 34.129 189.827 34.4928 189.979 34.7719C191.521 37.5925 192.884 39.7803 194.674 42.3517C194.908 42.6956 195.589 42.7504 196.078 42.6009C196.181 42.566 196.285 42.5162 196.36 42.4713C198.983 40.7022 201.455 38.1955 203.01 35.7088C203.485 34.9264 203.189 34.3134 202.06 34.1241V34.129ZM193.145 37.9464L191.576 35.3301C191.576 35.3301 191.294 34.9413 191.934 34.732C191.982 34.7121 192.037 34.6972 192.099 34.6872C192.099 34.6872 198.598 34.5178 200.628 34.8068C201.709 34.9663 201.751 35.2453 201.751 35.2453L193.145 37.9464Z'
						fill='white'
					></path>
				</g>
			</g>
			<path
				d='M168.982 34.8565C168.982 34.8565 167.757 38.5293 165.823 42.7653L162.243 39.4911L159.345 40.448L164.618 45.2819C162.972 48.5411 160.99 51.7853 158.876 53.6989L164.163 51.9597C165.368 51.1524 166.339 49.5178 167.096 47.5543L170.001 50.2155L172.92 49.2537L167.991 44.7487C169.058 40.6772 169.361 36.2469 168.982 34.8516V34.8565Z'
				fill='white'
			></path>
		</svg>
	);
};

export default Plane;
