import React from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";

class MasterForm extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      email: "",
      password: "",
      societyName: "",
      chain: [],
      VATNumber: [],
      SIRET: [],
      facturationAddress: [],
      ZIPcode: [],
      city: [],
      country: [],
      firstNameCEO: [],
      lastNameCEO: [],
      phoneCEO: [],
      cellPhoneCEO: [],
      firstNameSignatory: [],
      lastNameSignatory: [],
      emailSignatory: [],
      phoneSignatory: [],
      cellPhoneSignatory: [],
      firstNameAccounting: [],
      lastNameAccounting: [],
      phoneAccounting: [],
      cellPhoneAccounting: [],
      emailAccounting: [],
      paymentDelay: [],
      paymentMode: [],
      firstNameTechnical: [],
      lastNameTechnical: [],
      phoneTechnical: [],
      cellPhoneTechnical: [],
      emailTechnical: [],
      deliveryCompanyName: [],
      deliveryAddress: [],
      deliveryZIPcode: [],
      deliveryCity: [],
      deliveryContactEmail: [],
      deliveryContactPhone: [],
      contractSigned: [],
      disabled: true,
    };
  }
  // componentDidMount() {
  //   apiHandler.getAllActivities().then((data) => {
  //     this.setState({ activities: data });
  //   });
  // }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
    this.setState({
      disabled: false,
    });
    console.log(this.state.disabled);
  };

  handleClick = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.animals];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
  };
  handleClick3 = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.habits];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
    this.setState({
      disabled: false,
    });
  };
  handleClick4 = (event) => {
    const { name, value } = event.target;
    const animalsCopy = [...this.state.needs];
    animalsCopy.push(value);
    this.setState({
      [name]: animalsCopy,
    });
    this.setState({
      disabled: false,
    });
  };
  handleClick2 = (event) => {
    const { name, value } = event.target;
    const interestCopy = [...this.state.interest];
    const interestIndex = interestCopy.findIndex(
      (interest) => interest === value
    );
    if (event.target.checked === true) {
      interestCopy.push(value);
    } else {
      interestCopy.splice(interestIndex, 1);
    }
    this.setState({
      [name]: interestCopy,
    });
    this.setState({
      disabled: false,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 5 ? 6 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
      disabled: true,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button"
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button"
          onClick={this._next}
          disabled={this.state.disabled}
        >
          Suivant
        </button>
      );
    }
    return null;
  }

  render() {
    const progressArray = ["0", "1", "2", "3", "4", "5"];
    return (
      <React.Fragment>
        <div id="form-header">
          {this.previousButton()}
          <h1>Avant de débuter</h1>
        </div>
        <p>Step {this.state.currentStep} </p>
        <div id="progress-bar">
          {progressArray.map((index, value) => {
            return (
              <div
                id="progress-bar-step"
                key={index}
                style={{
                  color: index < this.state.currentStep ? "#F2CE70" : "white",
                  backgroundColor:
                    index < this.state.currentStep ? "#F2CE70" : "white",
                }}
              >
                {index}
              </div>
            );
          })}
        </div>
        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            password={this.state.password}
            societyName={this.state.societyName}
            chain={this.state.chain}
            VATNumber={this.state.VATNumber}
            SIRET={this.state.SIRET}
            facturationAddress={this.state.facturationAddress}
            ZIPcode={this.state.ZIPcode}
            city={this.state.city}
            country={this.state.country}
            firstNameCEO={this.state.firstNameCEO}
            lastNameCEO={this.state.lastNameCEO}
            phoneCEO={this.state.phoneCEO}
            cellPhoneCEO={this.state.cellPhoneCEO}
            email={this.state.email}
          />
          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstNameSignatory={this.state.firstNameSignatory}
            lastNameSignatory={this.state.lastNameSignatory}
            emailSignatory={this.state.emailSignatory}
            phoneSignatory={this.state.phoneSignatory}
            cellPhoneSignatory={this.state.cellPhoneSignatory}
          />
          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstNameAccounting={this.state.firstNameAccounting}
            lastNameAccounting={this.state.lastNameAccounting}
            phoneAccounting={this.state.phoneAccounting}
            cellPhoneAccounting={this.state.cellPhoneAccounting}
            emailAccounting={this.state.emailAccounting}
            paymentDelay={this.state.paymentDelay}
            paymentMode={this.state.paymentMode}
          />
          <Step4
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            firstNameTechnical={this.state.firstNameTechnical}
            lastNameTechnical={this.state.lastNameTechnical}
            phoneTechnical={this.state.phoneTechnical}
            cellPhoneTechnical={this.state.cellPhoneTechnical}
            emailTechnical={this.state.emailTechnical}
          />
          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            deliveryCompanyName={this.state.deliveryCompanyName}
            deliveryAddress={this.state.deliveryAddress}
            deliveryZIPcode={this.state.deliveryZIPcode}
            deliveryCity={this.state.deliveryCity}
            deliveryContactEmail={this.state.deliveryContactEmail}
            deliveryContactPhone={this.state.deliveryContactPhone}
          />
          <Step6
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            contractSigned={this.state.contractSigned}
            disabled={this.state.disabled}
          />

          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  }
}
function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }

  return (
    <div className="form-group">
      <h2>Informations sur la société</h2>
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={props.password}
        onChange={props.handleChange}
        required
      />
      <div>
        <label required htmlFor="societyName">
          Nom de société
        </label>
        <input
          className="form-control"
          id="societyName"
          name="societyName"
          type="text"
          value={props.societyName}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="chain">
          Enseigne
        </label>
        <input
          className="form-control"
          id="chain"
          name="chain"
          type="text"
          value={props.chain}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="VATNumber">
          N° TVA INTRACOM
        </label>
        <input
          className="form-control"
          id="VATNumber"
          name="VATNumber"
          type="text"
          value={props.VATNumber}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="SIRET">
          N° SIRET
        </label>
        <input
          className="form-control"
          id="SIRET"
          name="SIRET"
          type="text"
          value={props.SIRET}
          onChange={props.handleChange}
          onKeyPress={(event) => {
            if (!/[0-9]/.test(event.key)) {
              event.preventDefault();
            }
          }}
        />
      </div>
      <div>
        <label required htmlFor="facturationAddress">
          Addresse de Facturation
        </label>
        <input
          className="form-control"
          id="facturationAddress"
          name="facturationAddress"
          type="text"
          value={props.facturationAddress}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="ZIPcode">
          Code postal
        </label>
        <input
          className="form-control"
          id="ZIPcode"
          name="ZIPcode"
          type="text"
          value={props.ZIPcode}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="city">
          Ville
        </label>
        <input
          className="form-control"
          id="city"
          name="city"
          type="text"
          value={props.city}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="country">
          Pays
        </label>
        <input
          className="form-control"
          id="country"
          name="country"
          type="text"
          value={props.country}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="firstNameCEO">
          Prénom du dirigeant
        </label>
        <input
          className="form-control"
          id="firstNameCEO"
          name="firstNameCEO"
          type="text"
          value={props.firstNameCEO}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="lastNameCEO">
          Nom du dirigeant
        </label>
        <input
          className="form-control"
          id="lastNameCEO"
          name="lastNameCEO"
          type="text"
          value={props.lastNameCEO}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label required htmlFor="phoneCEO">
          Téléphone fixe du dirigeant
        </label>
        <input
          className="form-control"
          id="phoneCEO"
          name="phoneCEO"
          type="tel"
          value={props.phoneCEO}
          onChange={props.handleChange}
          // onKeyPress={(event) => {
          //   if (!/[0-9]/.test(event.key)) {
          //     event.preventDefault();
          //   }
          // }}
        />
      </div>
      <div>
        <label required htmlFor="cellPhoneCEO">
          Téléphone portable du dirigeant
        </label>
        <input
          className="form-control"
          id="cellPhoneCEO"
          name="cellPhoneCEO"
          type="text"
          value={props.cellPhoneCEO}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Addresse email du dirigeant</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Email"
          value={props.email}
          onChange={props.handleChange}
          required
        />
      </div>
    </div>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group">
      <div>
        <h2>Informations sur le contact signataire</h2>
        <label htmlFor="name">Prénom du signataire</label>
        <input
          className="form-control"
          id="firstNameSignatory"
          name="firstNameSignatory"
          type="text"
          placeholder="Prénom"
          value={props.firstNameSignatory}
          onChange={props.handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="lastNameSignatory">Nom du signataire</label>
        <input
          className="form-control"
          id="lastNameSignatory"
          name="lastNameSignatory"
          type="text"
          placeholder="Nom"
          value={props.lastNameSignatory}
          onChange={props.handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="emailSignatory">Addresse email du signataire</label>
        <input
          className="form-control"
          id="emailSignatory"
          name="emailSignatory"
          type="text"
          placeholder="Enter email"
          value={props.emailSignatory}
          onChange={props.handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="phoneSignatory">Téléphone fixe du signataire</label>
        <input
          className="form-control"
          id="phoneSignatory"
          name="phoneSignatory"
          type="text"
          placeholder="Enter phone number"
          value={props.phoneSignatory}
          onChange={props.handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cellPhoneSignatory">
          Téléphone portable du signataire
        </label>
        <input
          className="form-control"
          id="cellPhoneSignatory"
          name="cellPhoneSignatory"
          type="text"
          placeholder="Enter phone number"
          value={props.cellPhoneSignatory}
          onChange={props.handleChange}
          required
        />
      </div>
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <div>
          <h2>Informations sur le contact comptabilité</h2>
          <label htmlFor="firstNameAccounting">Prénom du comptable</label>
          <input
            className="form-control"
            id="firstNameAccounting"
            name="firstNameAccounting"
            type="text"
            placeholder="Prénom"
            value={props.firstNameAccounting}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastNameAccounting">Nom du comptable</label>
          <input
            className="form-control"
            id="lastNameAccounting"
            name="lastNameAccounting"
            type="text"
            placeholder="Nom"
            value={props.lastNameAccounting}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailAccounting">Addresse email du comptable</label>
          <input
            className="form-control"
            id="emailAccounting"
            name="emailAccounting"
            type="text"
            placeholder="Enter email"
            value={props.emailAccounting}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneAccounting">Téléphone fixe du comptable</label>
          <input
            className="form-control"
            id="phoneAccounting"
            name="phoneAccounting"
            type="text"
            placeholder="Enter phone number"
            value={props.phoneAccounting}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cellPhoneAccounting">
            Téléphone portable du comptable
          </label>
          <input
            className="form-control"
            id="cellPhoneAccounting"
            name="cellPhoneAccounting"
            type="text"
            value={props.cellPhoneAccounting}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentDelay">Délai de paiement</label>
          <input
            className="form-control"
            id="paymentDelay"
            name="paymentDelay"
            type="text"
            value={props.paymentDelay}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="paymentMode">Méthode de paiement</label>
          <input
            className="form-control"
            id="paymentMode"
            name="paymentMode"
            type="radio"
            value="Virement"
            onChange={props.handleChange}
            required
          />
          <input
            className="form-control"
            id="paymentMode"
            name="paymentMode"
            type="radio"
            value="Autre"
            onChange={props.handleChange}
            required
          />
        </div>
      </div>
    </React.Fragment>
  );
}

function Step4(props) {
  if (props.currentStep !== 4) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <div>
          <h2>Informations sur le contact technique</h2>
          <label htmlFor="firstNameTechnical">
            Prénom du contact technique
          </label>
          <input
            className="form-control"
            id="firstNameTechnical"
            name="firstNameTechnical"
            type="text"
            placeholder="Prénom"
            value={props.firstNameTechnical}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastNameTechnical">Nom du contact technique</label>
          <input
            className="form-control"
            id="lastNameTechnical"
            name="lastNameTechnical"
            type="text"
            placeholder="Nom"
            value={props.lastNameTechnical}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="emailTechnical">
            Addresse email du contact technique
          </label>
          <input
            className="form-control"
            id="emailTechnical"
            name="emailTechnical"
            type="text"
            placeholder="Enter email"
            value={props.emailTechnical}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneTechnical">
            Téléphone fixe du contact technique
          </label>
          <input
            className="form-control"
            id="phoneTechnical"
            name="phoneTechnical"
            type="text"
            placeholder="Enter phone number"
            value={props.phoneTechnical}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="cellPhoneTechnical">
            Téléphone portable du contact technique
          </label>
          <input
            className="form-control"
            id="cellPhoneTechnical"
            name="cellPhoneTechnical"
            type="text"
            value={props.cellPhoneTechnical}
            onChange={props.handleChange}
            required
          />
        </div>
      </div>
    </React.Fragment>
  );
}

function Step5(props) {
  if (props.currentStep !== 5) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <div>
          <h2>Informations sur le point de livraison</h2>
          <label htmlFor="deliveryCompanyName">Nom de l'enseigne</label>
          <input
            className="form-control"
            id="deliveryCompanyName"
            name="deliveryCompanyName"
            type="text"
            placeholder="Prénom"
            value={props.deliveryCompanyName}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryAddress">Addresse de livraison</label>
          <input
            className="form-control"
            id="deliveryAddress"
            name="deliveryAddress"
            type="text"
            placeholder="......"
            value={props.deliveryAddress}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryZIPcode">
            Code postal du point de livraison
          </label>
          <input
            className="form-control"
            id="deliveryZIPcode"
            name="deliveryZIPcode"
            type="text"
            placeholder="Code postal"
            value={props.deliveryZIPcode}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryCity">Ville</label>
          <input
            className="form-control"
            id="deliveryCity"
            name="deliveryCity"
            type="text"
            placeholder="Ville"
            value={props.deliveryCity}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryContactEmail">
            Email du point de livraison
          </label>
          <input
            className="form-control"
            id="deliveryContactEmail"
            name="deliveryContactEmail"
            type="text"
            value={props.deliveryContactEmail}
            onChange={props.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deliveryContactPhone">
            Téléphone du point de livraison
          </label>
          <input
            className="form-control"
            id="deliveryContactPhone"
            name="deliveryContactPhone"
            type="text"
            value={props.deliveryContactPhone}
            onChange={props.handleChange}
            required
          />
        </div>
      </div>
    </React.Fragment>
  );
}
function Step6(props) {
  if (props.currentStep !== 6) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group">
        <h2>Les termes et conditions</h2>
      </div>
      <div>
        <label htmlFor="contractSigned">
          Veuillez lire les termes et conditions avant de les accepter
        </label>
        <input
          className="form-control"
          id="contractSigned"
          name="contractSigned"
          type="checkbox"
          value={props.contractSigned}
          onChange={props.handleChange}
          required
        />
      </div>
      <button className="btn btn-success btn-block" disabled={props.disabled}>
        Sign up
      </button>
    </React.Fragment>
  );
}
export default withRouter(MasterForm);
