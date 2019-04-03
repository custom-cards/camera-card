var LitElement =
  LitElement ||
  Object.getPrototypeOf(customElements.get("home-assistant-main"));
var html = LitElement.prototype.html;

class CameraCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {}
    };
  }

  shouldUpdate(changedProps) {
    if (changedProps.has("_config")) {
      return true;
    }

    const oldHass = changedProps.get("hass");

    if (oldHass) {
      return (
        oldHass.states[this._config.entity] !==
        this.hass.states[this._config.entity]
      );
    }

    return true;
  }

  getCardSize() {
    return 6;
  }

  setConfig(config) {
    this._config = config;
  }

  render() {
    if (!this._config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this._config.entity];

    if (!stateObj) {
      return html`
        ${this.renderStyle()}
        <ha-card>
          <div class="warning">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    return html`
      ${this.renderStyle()}
      <ha-card .header=${this._config.name}>
        <more-info-camera
          .hass="${this.hass}"
          .stateObj="${stateObj}"
        ></more-info-camera>
      </ha-card>
    `;
  }

  renderStyle() {
    return html`
      <style>
        .warning {
          display: block;
          color: black;
          background-color: #fce588;
          padding: 8px;
        }
      </style>
    `;
  }
}

customElements.define("camera-card", CameraCard);
