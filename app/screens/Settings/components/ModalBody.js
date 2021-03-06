import React, {
  PropTypes
} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  FormGroup,
  Checkbox,
  HelpBlock,
  ControlLabel,
  FormControl,
  Panel,
} from 'react-bootstrap'

import {
  toggleShowSpeciesWithZeroPokemon,
  resetAllSettings,
  checkAndDeleteCredentials,
  toggleAutoLogin,
  changeDefaultPokedexSortBy,
  changeDefaultPokedexSortDirection,
  changeDefaultSpecieSortBy,
  changeDefaultSpecieSortDirection,
  sortWithDefaults,
} from '../../../actions'

function SettingFieldGroupCheckbox({ label, help, ...props }) {
  return (
    <FormGroup>
      <Checkbox {...props} >
        {label}
      </Checkbox>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

SettingFieldGroupCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
}

function SettingFieldGroupSelect({ id, label, help, options, ...props }) {
  const optionComponents = options.map((option, i) => (<option key={i} value={option}>{option}</option>))

  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl componentClass="select" placeholder="select" {...props}>
        {optionComponents}
      </FormControl>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  )
}

SettingFieldGroupSelect.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  options: PropTypes.array.isRequired,
}

const pokedexSortByOptions = [
  'pokemon_id',
  'name',
  'count',
  'candy',
  'evolves',
]

const sortDirectionOptions = [
  'ascending',
  'descending',
]

const specieSortByOptions = [
  'favorite',
  'name',
  'nickname',
  'cp',
  'level',
  'iv',
]

class ModalBody extends React.Component {
  static displayName = 'ModalBody'

  static propTypes = {
    toggleShowSpeciesWithZeroPokemon: PropTypes.func.isRequired,
    resetAllSettings: PropTypes.func.isRequired,
    checkAndDeleteCredentials: PropTypes.func.isRequired,
    showSpeciesWithZeroPokemon: PropTypes.bool.isRequired,
    toggleAutoLogin: PropTypes.func.isRequired,
    autoLogin: PropTypes.bool.isRequired,
    changeDefaultPokedexSortBy: PropTypes.func.isRequired,
    changeDefaultPokedexSortDirection: PropTypes.func.isRequired,
    changeDefaultSpecieSortBy: PropTypes.func.isRequired,
    changeDefaultSpecieSortDirection: PropTypes.func.isRequired,
    defaultPokedexSortBy: PropTypes.string.isRequired,
    defaultPokedexSortDirection: PropTypes.string.isRequired,
    defaultSpecieSortBy: PropTypes.string.isRequired,
    defaultSpecieSortDirection: PropTypes.string.isRequired,
    sortWithDefaults: PropTypes.func.isRequired,
  }

  render() {
    const {
      defaultPokedexSortBy,
      defaultPokedexSortDirection,
      defaultSpecieSortBy,
      defaultSpecieSortDirection,
    } = this.props

    return (
      <div className="modal-body">
        <Panel header="Table Configuration" bsStyle="primary">
          <SettingFieldGroupCheckbox
            label="Display Uncaught Species"
            checked={this.props.showSpeciesWithZeroPokemon}
            help="If you have no Mew, this will display them when enabled."
            onChange={this.handleToggleShowAllSpecies}
            id="displayUncaught"
          />
          <SettingFieldGroupSelect
            label="Default Pokedex Sort By"
            id="defaultPokedexSortBy"
            onChange={this.handleDefaultPokedexSortByChange}
            defaultValue={defaultPokedexSortBy}
            options={pokedexSortByOptions}
          />
          <SettingFieldGroupSelect
            label="Default Pokedex Sort Direction"
            onChange={this.handleDefaultPokedexSortDirectionChange}
            defaultValue={defaultPokedexSortDirection === 'ASC' ? sortDirectionOptions[0] : sortDirectionOptions[1]}
            options={sortDirectionOptions}
            id="defaultPokedexSortDirection"
          />
          <SettingFieldGroupSelect
            label="Default Specie Sort By"
            id="defaultSpecieSortBy"
            onChange={this.handleDefaultSpecieSortByChange}
            defaultValue={defaultSpecieSortBy}
            options={specieSortByOptions}
          />
          <SettingFieldGroupSelect
            label="Default Specie Sort Direction"
            onChange={this.handleDefaultSpecieSortDirectionChange}
            defaultValue={defaultSpecieSortDirection === 'ASC' ? sortDirectionOptions[0] : sortDirectionOptions[1]}
            options={sortDirectionOptions}
            id="defaultSpecieSortDirection"
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSortWithDefaults}
          >
            Sort with Defaults
          </button>
        </Panel>
        <Panel header="Other">
          <SettingFieldGroupCheckbox
            label="Automatically Login"
            checked={this.props.autoLogin}
            help="Authenticate with stored credentials on launch."
            onChange={this.handleToggleAutoLogin}
            id="autoLogin"
          />
          <div className="form-group">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleDeleteCredentials}
            >
              Delete Stored Credentials
            </button>
          </div>
          <div className="form-group">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleReset}
            >
              Reset All Settings
            </button>
          </div>
        </Panel>
      </div>
    )
  }

  getDirection = value => (value === sortDirectionOptions[0] ? 'ASC' : 'DESC')

  handleSortWithDefaults = () => {
    const {
      defaultPokedexSortBy,
      defaultPokedexSortDirection,
      defaultSpecieSortBy,
      defaultSpecieSortDirection,
    } = this.props

    this.props.sortWithDefaults({
      defaultPokedexSortBy,
      defaultPokedexSortDirection,
      defaultSpecieSortBy,
      defaultSpecieSortDirection,
    })
  }

  handleDefaultPokedexSortDirectionChange = (e) => {
    this.props.changeDefaultPokedexSortDirection(this.getDirection(e.target.value))
  }

  handleDefaultPokedexSortByChange = (e) => {
    this.props.changeDefaultPokedexSortBy(e.target.value)
  }

  handleDefaultSpecieSortDirectionChange = (e) => {
    this.props.changeDefaultSpecieSortDirection(this.getDirection(e.target.value))
  }

  handleDefaultSpecieSortByChange = (e) => {
    this.props.changeDefaultSpecieSortBy(e.target.value)
  }

  handleToggleAutoLogin = () => {
    this.props.toggleAutoLogin()
  }

  handleToggleShowAllSpecies = () => {
    this.props.toggleShowSpeciesWithZeroPokemon()
  }

  handleReset = () => {
    this.props.resetAllSettings()
  }

  handleDeleteCredentials = () => {
    this.props.checkAndDeleteCredentials()
  }
}


export default connect((state => ({
  showSpeciesWithZeroPokemon: state.settings.showSpeciesWithZeroPokemon,
  autoLogin: state.settings.autoLogin,
  defaultPokedexSortBy: state.settings.defaultPokedexSortBy,
  defaultPokedexSortDirection: state.settings.defaultPokedexSortDirection,
  defaultSpecieSortBy: state.settings.defaultSpecieSortBy,
  defaultSpecieSortDirection: state.settings.defaultSpecieSortDirection,
})), (dispatch => bindActionCreators({
  toggleShowSpeciesWithZeroPokemon,
  resetAllSettings,
  checkAndDeleteCredentials,
  toggleAutoLogin,
  changeDefaultPokedexSortBy,
  changeDefaultPokedexSortDirection,
  changeDefaultSpecieSortBy,
  changeDefaultSpecieSortDirection,
  sortWithDefaults,
}, dispatch)))(ModalBody)
