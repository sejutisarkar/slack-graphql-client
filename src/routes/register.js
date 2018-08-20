import React from 'react';
import {Input, Container, Header, Button} from 'semantic-ui-react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';


class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
  };
  onChange = e => {
      const { name, value } = e.target;
      // name = "email";
      this.setState({ [name]: value });
    };
  onSubmit = async ()=> {
    const response = await this.props.mutate({
      variables: this.state
    })
    console.log(response);
    console.log(this.state);
  }

  render() {
    const { username, email, password } = this.state;

    return (
      <Container text>
        <Header as="h2">Register</Header>
        <Input
          name="username"
          onChange={this.onChange}
          value={username}
          placeholder="Username"
          fluid
        />
        <Input name="email" onChange={this.onChange} value={email} placeholder="Email" fluid />
        <Input
          name="password"
          onChange={this.onChange}
          value={password}
          type="password"
          placeholder="Password"
          fluid
        />
        <Button onClick={this.onSubmit}>Submit</Button>
      </Container>
    );
  }
}
const registerMutation = gql`
  mutation($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password){
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);
