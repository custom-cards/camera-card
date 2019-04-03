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

  getCardSize() {
    return 1;
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
        <ha-card>
          <div class="warning">
            Entity not available: ${this._config.entity}
          </div>
        </ha-card>
      `;
    }

    return html`
      ${this.renderStyle()}
      <ha-card>
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
