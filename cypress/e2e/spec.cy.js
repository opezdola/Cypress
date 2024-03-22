describe('Тесты на hh.ru', () => {
  it('Регистрация нового пользователя', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Создать резюме').click();
    cy.get('input[name="login"]').type('vvannppiiss@mail.ru');
    cy.contains('Зарегистрироваться').click();
    cy.pause();
    cy.contains('Подтвердить').click().should('exist');
  });

  it('Регистрация нового пользователя негативный сценарий', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Создать резюме').click();
    cy.get('input[name="login"]').type('qwerty@qwerty.qwerty');
    cy.contains('Зарегистрироваться').click();
    cy.wait(3000);
  });

  it('Авторизация пользователя с помощью почты', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Войти').click();
    cy.get('input[name="login"]').type('ppiissvvann@mail.ru');
    cy.contains('Продолжить').click();
    cy.pause();
    cy.contains('Подтвердить').click().should('exist');
  });


  it('Авторизация пользователя с паролем', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Войти').click();
    cy.get('input[name="login"]').type('ppiissvvann@mail.ru');
    cy.contains('Войти с паролем').click();
    cy.get('input[aria-label="Введите пароль"]').type('Zxcvbnm,./!');
    cy.get('button[data-qa="account-login-submit"]').click().should('exist');
  });

  it('Авторизация несуществующего пользователя', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Войти').click();
    cy.get('input[name="login"]').type('ppiiss@mail.ru');
    cy.contains('Войти с паролем').click();
    cy.get('input[aria-label="Введите пароль"]').type('ppiiss');
    cy.get('button[data-qa="account-login-submit"]').click();
    cy.wait(3000);
  });

  it('Поиск резюме', () => {
    cy.visit('https://hh.ru');
    cy.get('input[data-qa="search-input"]').type('Юрист');
    cy.get('[data-qa="search-button"] button').click({ force: true }).should('exist');
    // cy.get('div[data-qa="bloko-modal-close"]').click({ force: true }).should('exist');

  });

  it('Проверка фильтров в поиске вакансий', () => {
    cy.visit('https://hh.ru');
    cy.get('.bloko-button[data-qa="advanced-search"]').click({force: true});
    cy.contains('в названии вакансии').click();
    cy.contains('Стажировка').click();
    cy.get('input[data-qa="vacancysearch__keywords-input"]').type('Юрист');
    cy.get('input[data-qa="vacancysearch__keywords-excluded-input"]').type('Официант');
    cy.get('input[data-qa="advanced-search-region-add"]').type('Казань');
    cy.get('input[data-qa="advanced-search-salary"]').type('52');
    cy.get('button[data-qa="advanced-search-submit-button"]').click({ force: true });
  });

  it('Подтверждение города', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Ваш регион — Томск?').should('be.visible');
    cy.contains('Всё верно').click().should('exist');
  });

  it('Изменение пароля', () => {
    cy.visit('https://tomsk.hh.ru');
    cy.contains('Войти').click();
    cy.get('input[name="login"]').type('vvannppiiss@mail.ru');
    cy.contains('Войти с паролем').click();
    cy.get('input[aria-label="Введите пароль"]').type('Zxcvbnm,./!');
    cy.get('button[data-qa="account-login-submit"]').click();
    cy.get('button[data-qa="mainmenu_applicantProfile"]').click();
    cy.get('.supernova-dropdown-section_main-content').contains('Настройки').click();
    cy.get('[data-qa="settings__password-edit"]').contains('Изменить').click();
    cy.get('input[data-qa="settings__password-password"]').type('Zxcvbnm,./!');
    cy.get('input[name="newPassword"]').type('zxcvbnm,./1');
    cy.get('input[name="newPasswordConfirm"]').type('zxcvbnm,./1');
    cy.get('input[data-qa="settings__password-submit"]').click().should('exist');
  });



});