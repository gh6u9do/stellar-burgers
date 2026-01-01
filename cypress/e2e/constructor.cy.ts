
describe('constructor page', () => {

    beforeEach(() => {
        // записываем токены доступа и обновления
        cy.setCookie('accessToken', 'test-access-token');
        window.localStorage.setItem('refreshToken', 'test-refresh-token');

        // возвращаем моковые данные на запрос ингредиентов
        cy.intercept('GET', '**/api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

        // возвращаем моковые данные на запрос пользовательских данных
        cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');

        // возвращаем моковые данные ответа на запрос создания заказа
        cy.intercept('POST', '**/orders', {fixture: 'order.json' }).as('createOrder');

        // переходим на главный экран
        cy.visit('/');

        // ожидаем получение данных
        cy.wait('@getIngredients');
    })

    it('булочка и начинка добавляется в контсруктор', () => {
        // добавляем булочку
        cy.contains('Краторная булка').parent().contains('Добавить').click();

        // добавляем начинку
        cy.contains('Хрустящие минеральные кольца').parent().contains('Добавить').click();

        // проверяем булки (сверху и снизу)
        cy.get('[data-cy="bun-top"]').should('exist');
        cy.get('[data-cy="bun-bottom"]').should('exist');

        // проверяем начинку
        cy.get('[data-cy="constructor-ingredients"]').children().should('have.length', 1);
    });

    it('модалка ингредиента открывается и закрывается', () => {
        // открываем модалку
        cy.get('[data-cy="ingredient-card"]').first().click();
        cy.contains('Калории, ккал').should('exist');

        // закрытие по крестику
        cy.get('[data-cy="modal-close"]').click();
        cy.contains('Калории, ккал').should('not.exist');

        // снова открываем модалку
        cy.get('[data-cy="ingredient-card"]').first().click();
        cy.contains('Калории, ккал').should('exist');

        // закрываем по клику на оверлей
        cy.get('[data-cy="modal-overlay"]').click({ force: true });
        cy.contains('Калории, ккал').should('not.exist');
    });

    it('заказ создается', () => {
        // собираем бургер
        cy.contains('Краторная булка').parent().contains('Добавить').click();
        cy.contains('Хрустящие минеральные кольца').parent().contains('Добавить').click();
        cy.contains('Соус с шипами Антарианского плоскоходца').parent().contains('Добавить').click();

        // оформляем заказ
        cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();

        // ждем запрос создания заказа
        cy.wait('@createOrder');

        // проверяем что открылось модальное окно
        cy.contains('12345').should('exist');

        // закрываем по клику на крестик
        cy.get('[data-cy="modal-close"]').click();

        // проверяем что модалка закрыта
        cy.contains('12345').should('not.exist');

        // проверяем что конструктор пуст
        cy.get('[data-cy="bun-top"]').should('not.exist');
        cy.get('[data-cy="bun-bottom"]').should('not.exist');
        cy.get('[data-cy="constructor-item"]').should('not.exist');
    });
})
