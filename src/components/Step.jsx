import React, { Component } from "react";

export default class Step extends Component {
  state = {
    currentIndex: 0,
  };

  increment = (event) => {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
  };

  render() {
    const { steps, handleFinal } = this.props;
    return (
      <div className="step">
        {this.state.currentIndex < this.props.steps.length - 1 && (
          <div>
            <h1>
              Etape {this.state.currentIndex + 1}:{" "}
              {steps[this.state.currentIndex].title}
            </h1>
            <p>{steps[this.state.currentIndex].content}</p>
            <button onClick={this.increment}>Suivant</button>
          </div>
        )}
        {this.state.currentIndex === this.props.steps.length - 1 && (
          <div>
            <h1>
              Etape {this.state.currentIndex + 1}:{" "}
              {steps[this.state.currentIndex].title}
            </h1>
            <p>{steps[this.state.currentIndex].content}</p>
            <button onClick={handleFinal}>C'est bon pour moi</button>
          </div>
        )}
      </div>
    );
  }
}
