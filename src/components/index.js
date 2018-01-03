
//This is your top level React component, you may change everything

import React from 'react'
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';

import InputBox from "./input";
import MessagesBoard from "./messagesBoard";

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
`;


class App extends React.PureComponent {
	constructor(props){
		super(props);

		this.state = { messages : [] };
		
		this.handelMessageCreated = this.handelMessageCreated.bind(this);
	}

	handelMessageCreated(messageContent) {
		this.setState((prevState, props) => ({
			messages: prevState.messages.concat([messageContent])
		}));
	}

  	render() {
		return <div>
			<Container className={'spotim-header'}>
				<div className={'spotim-title'}>
					Welcome to the Spot.IM Chat app
				</div>
				<div>
					<Logo>
					<Image size={'tiny'} src={logo}/>
					</Logo>
				</div>
			</Container>

			<Container className={'spotim-chat'}>
				<MessagesBoard messages={this.state.messages} />


				<InputBox onMessageCreated={this.handelMessageCreated}/>
			</Container>
		</div>
	}
}

export default App;